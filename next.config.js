/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [{
            source: "/api/:path*",
            destination: "http://localhost:3000/api/:path*",
        }, ];
    },
    async headers() {
        return [{
            source: "/:path*{/}?",
            headers: [{
                key: "Access-Control-Allow-Origin",
                value: "*",
            }, ],
        }, ];
    },
};

module.exports = nextConfig;