/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'res.cloudinary.com'},
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      {protocol: 'https', hostname: 'cdn.simpleicons.org'},
    ],
  },
  async redirects() {
    return [
      {
        source: "/v2",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
