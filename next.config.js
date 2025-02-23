/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,  // ローカルの画像を最適化せずに使用
  },
}

module.exports = nextConfig 