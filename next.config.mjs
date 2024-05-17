/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploads.mangadex.org',
                port:'',
                pathname:'/**',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port:'',
                pathname:'/**',
            }
        ],
    },
};

export default nextConfig;
