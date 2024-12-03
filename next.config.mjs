/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    // webpack: (config, options) => {
    //     if (!options.dev) {
    //         config.devtool = options.isServer ? false : "eval-source-map";
    //     }
    //     return config;
    // },
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            html2canvas: "html2canvas-pro", // Alias html2canvas to html2canvas-pro
        };

        config.module.rules.push({
            test: /\.ttf$/,
            type: "asset/resource", // This ensures the font files are processed correctly
        });

        return config;
    },

    serverRuntimeConfig: {
        apiUrl: process.env.NEXT_SERVER_API_HOST,
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NEXT_PUBLIC_API_HOST,
    },
    env: {
        API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    },
    experimental: {
        typedRoutes: true,
    },
    images: {
        domains: [
            "picsum.photos",
            "storage.googleapis.com",
            "i.imgur.com",
            "i.imgur.com",
        ],
        remotePatterns: [
            {
                protocol: process.env.REMOTE_PROTOCOL,
                hostname: process.env.REMOTE_HOSTNAME,
            },
            {
                hostname: process.env.REMOTE_PHOTO_MOCK_DATA,
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
        ],
    },
};

export default nextConfig;
