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
                hostname: 'cmdxd98sb0x3yprd.mangadex.network',
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
