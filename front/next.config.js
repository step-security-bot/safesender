/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };

        if (isServer) {
            config.output.webassemblyModuleFilename =
                "./../static/wasm/[modulehash].wasm";
        } else {
            config.output.webassemblyModuleFilename =
                "static/wasm/[modulehash].wasm";
        }

        return config;
    },
};

module.exports = nextConfig;
