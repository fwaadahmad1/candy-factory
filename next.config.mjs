/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },{
                source: '/production',
                destination: '/production/inLine',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
