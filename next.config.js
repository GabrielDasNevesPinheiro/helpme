/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
            test: /\.node/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: 'node-loader',
                },
            ],
        })
        return config;
    },
    env: {
        MONGO_URL: process.env.MONGO_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        //NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        SOCKET_URL: process.env.SOCKET_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            }
        ]
    }
}

module.exports = nextConfig
