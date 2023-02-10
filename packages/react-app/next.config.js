// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (config) => {
//     config.resolve.fallback = {
//       fs: false
//     }
//     return config
//   }
// }

// module.exports = nextConfig

module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/Dashboard': { page: '/Dashboard' },
      '/CreateAccount': { page: '/CreateAccount' },
      '/Support': { page: '/Support' },
      '/Withdraw': { page: '/Withdraw' },
    }
  },
}
