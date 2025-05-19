/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nature-tours.up.railway.app',
				port: '',
				pathname: '/img/tours/**',
				search: '',
			},
		],
	},
};

export default nextConfig;
