/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = {
    async redirects() {
        return [
            {
                source: "*",
                destination: "/delete/init",
                permanent: true
            }
        ];
    }
};
module.exports = nextConfig
