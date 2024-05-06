/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'store.istad.co',

                pathname: '/media/product_images/*',
            },
        ],
        domains: ['i.imgur.com','img.freepik.com','i.pinimg.com','fakestoreapi.com','cdn-icons-png.flaticon.com',"avatars.githubusercontent.com",'via.placeholder.com','store.istad.co','i.ibb.co','hips.hearstapps.com', "lh3.googleusercontent.com"],
    },
};

export default nextConfig;