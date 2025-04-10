/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Blog pages have been physically moved out of the pages directory
  // to prevent build errors

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