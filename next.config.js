/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Skip building blog pages since they're causing errors
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/resume': { page: '/resume' },
      // Exclude blog pages from the build
    };
  },

  async rewrites() {
    return [
      {
        source: '/.well-known/lnurlp/:slug',
        destination: '/api/lnurlp/:slug',
      },
      {
        source: "/.well-known/nostr.json",
        destination: "/api/nostr/nip05",
      }
    ]
  }
}

module.exports = nextConfig