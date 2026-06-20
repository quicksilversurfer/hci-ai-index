/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4409x4u6zb58.cloudfront.net",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
