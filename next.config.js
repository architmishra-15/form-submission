/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // The obfuscation will be added in a build step 
  // See README.md for instructions on how to obfuscate
  // the production build using javascript-obfuscator
}

module.exports = nextConfig