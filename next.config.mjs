const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'postfiles.pstatic.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.toi-media.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
