/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    // webpack: (config, options) => {
    //     if (!options.dev) {
    //         config.devtool = options.isServer ? false : "eval-source-map";
    //     }
    //     return config;
    // },
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
        ],
    },
};

export default nextConfig;
