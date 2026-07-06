export declare const config: {
    port: number;
    nodeEnv: string;
    isProduction: boolean;
    isDevelopment: boolean;
    database: {
        url: string;
    };
    jwt: {
        secret: string;
        refreshSecret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    };
    frontendUrl: string;
    rateLimit: {
        windowMs: number;
        max: number;
    };
    upload: {
        dir: string;
        maxFileSize: number;
    };
};
//# sourceMappingURL=index.d.ts.map