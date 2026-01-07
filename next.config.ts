/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'storage.googleapis.com', 'api.eurekalogistics.co.id'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
