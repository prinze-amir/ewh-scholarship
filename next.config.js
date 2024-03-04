/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [ 
            {
                protocol: 'https',
                hostname:'drive.google.com',
            },

            {
                hostname:'wallpapers.com',
            }
        ],
    },
    async headers() {
        return [
        {
            source: '/api/recipients',
            headers: [
            {
                key: 'Cache-Control',
                value: 'no-store',
            },
            ],
        },
        ]
    },
    
}

module.exports = nextConfig
