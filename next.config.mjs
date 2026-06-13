/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://public-assets.sid.id/**'), new URL('https://privy.id/**')],
  },
}

export default nextConfig
