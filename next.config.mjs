/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/star-voyager",
  assetPrefix: "/star-voyager/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
