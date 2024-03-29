/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS: "https://swipe-project-nextjs.s3.eu-central-1.amazonaws.com/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swipe-project-nextjs.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
