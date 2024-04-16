/** @type {import('next').NextConfig} */
const path = require('path')
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
    webpack: (config, options) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
      },
    
}

module.exports = nextConfig
