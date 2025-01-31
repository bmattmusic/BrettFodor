/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
        pathname: '/**',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://api.printful.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' https://files.cdn.printful.com https://api.printful.com data: blob:;",
              "connect-src 'self' https://api.printful.com;",
            ].join(' ')
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig