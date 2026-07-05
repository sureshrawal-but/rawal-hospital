import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config';
import { sendSuccess, sendError, sendCreated } from '../utils/apiResponse';
import { hashPassword, comparePassword, generateToken, sanitizeUser } from '../utils/helpers';
import { JwtPayload } from '../middleware/auth';
import { createAuditLog } from '../middleware/audit';

const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  } as jwt.SignOptions);
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      sendError(res, 'Email already registered', 409);
      return;
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: role || 'PATIENT',
      },
    });

    if (role === 'PATIENT' || !role) {
      const count = await prisma.patient.count();
      await prisma.patient.create({
        data: {
          userId: user.id,
          registrationNo: `RAW${String(count + 1).padStart(6, '0')}`,
          firstName,
          lastName,
          phone,
          email,
        },
      });
    }

    const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
    const tokens = generateTokens(payload);

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await createAuditLog(user.id, 'REGISTER', 'User', user.id, {}, req.ip, req.headers['user-agent']);

    sendCreated(res, {
      user: sanitizeUser(user),
      ...tokens,
    }, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      sendError(res, 'Invalid email or password', 401);
      return;
    }

    if (!user.isActive) {
      sendError(res, 'Account is deactivated. Contact administrator.', 401);
      return;
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      sendError(res, 'Invalid email or password', 401);
      return;
    }

    const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
    const tokens = generateTokens(payload);

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    await createAuditLog(user.id, 'LOGIN', 'User', user.id, {}, req.ip, req.headers['user-agent']);

    let profile = null;
    if (user.role === 'PATIENT') {
      profile = await prisma.patient.findUnique({ where: { userId: user.id } });
    } else if (user.role === 'DOCTOR') {
      profile = await prisma.doctor.findUnique({ where: { userId: user.id }, include: { department: true } });
    } else {
      profile = await prisma.staff.findUnique({ where: { userId: user.id } });
    }

    sendSuccess(res, {
      user: sanitizeUser(user),
      profile,
      ...tokens,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      sendError(res, 'Invalid or expired refresh token', 401);
      return;
    }

    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as JwtPayload;
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isActive) {
      sendError(res, 'Invalid refresh token', 401);
      return;
    }

    const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
    const tokens = generateTokens(payload);

    await prisma.refreshToken.delete({ where: { id: stored.id } });
    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    sendSuccess(res, tokens, 'Token refreshed');
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      sendError(res, 'Invalid refresh token', 401);
      return;
    }
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      sendSuccess(res, null, 'If the email exists, a reset link has been sent');
      return;
    }

    const resetToken = generateToken();
    const resetTokenExp = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExp },
    });

    // In production, send email with reset link
    const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
    console.log('Reset URL:', resetUrl);

    sendSuccess(res, { resetUrl }, 'Password reset link sent to email');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExp: { gte: new Date() },
      },
    });

    if (!user) {
      sendError(res, 'Invalid or expired reset token', 400);
      return;
    }

    const hashed = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    await createAuditLog(user.id, 'RESET_PASSWORD', 'User', user.id, {}, req.ip, req.headers['user-agent']);
    sendSuccess(res, null, 'Password reset successful');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
        lastLogin: true,
        createdAt: true,
        patient: true,
        doctor: { include: { department: true } },
        staff: true,
      },
    });

    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    const { firstName, lastName, dateOfBirth, gender, bloodGroup, phone, address, city, state, pincode, occupation, emergencyContactName, emergencyContactPhone, allergies, chronicDiseases, alternatePhone } = req.body;

    if (user.role === 'PATIENT') {
      const updateData: Record<string, unknown> = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
      if (gender) updateData.gender = gender;
      if (bloodGroup) updateData.bloodGroup = bloodGroup;
      if (phone) updateData.phone = phone;
      if (alternatePhone) updateData.alternatePhone = alternatePhone;
      if (address) updateData.address = address;
      if (city) updateData.city = city;
      if (state) updateData.state = state;
      if (pincode) updateData.pincode = pincode;
      if (occupation) updateData.occupation = occupation;
      if (emergencyContactName) updateData.emergencyContactName = emergencyContactName;
      if (emergencyContactPhone) updateData.emergencyContactPhone = emergencyContactPhone;
      if (allergies) updateData.allergies = allergies;
      if (chronicDiseases) updateData.chronicDiseases = chronicDiseases;

      await prisma.patient.update({ where: { userId }, data: updateData });
    } else if (user.role === 'DOCTOR') {
      const updateData: Record<string, unknown> = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;
      if (city) updateData.city = city;
      if (state) updateData.state = state;
      if (pincode) updateData.pincode = pincode;
      await prisma.doctor.update({ where: { userId }, data: updateData });
    } else {
      const updateData: Record<string, unknown> = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phone) updateData.phone = phone;
      await prisma.staff.update({ where: { userId }, data: updateData });
    }

    await prisma.user.update({ where: { id: userId }, data: { email: req.body.email || undefined } });

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, isActive: true, patient: true, doctor: true, staff: true },
    });

    sendSuccess(res, updatedUser, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};
