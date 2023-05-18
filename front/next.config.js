/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        return config;
    },
};

module.exports = nextConfig

// module.exports = {
//     experiments: {
//         asyncWebAssembly: true,
//     },
// };