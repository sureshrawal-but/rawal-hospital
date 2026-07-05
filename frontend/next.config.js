/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'via.placeholder.com'],
  },
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = nextConfig;
