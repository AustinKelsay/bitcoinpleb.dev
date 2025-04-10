/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Blog pages have been completely removed to fix build errors
  // Explicitly include only the pages we want to build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // Explicitly define which pages to include in build
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/resume': { page: '/resume' }
    };
  },

  // Configure images to properly handle static image loading
  images: {
    unoptimized: true,
    domains: ['i.ytimg.com', 'i.scdn.co', 'pbs.twimg.com', 'plebdevs-bucket.nyc3.cdn.digitaloceanspaces.com', 'forethought.ai'],
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