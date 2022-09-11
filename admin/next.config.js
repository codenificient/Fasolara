/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [ 'randomuser.me' ]
	},
  experimental: { images: { layoutRaw: true } }
}

module.exports = nextConfig
