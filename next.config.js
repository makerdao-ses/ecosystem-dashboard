/* eslint-disable spellcheck/spell-checker */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
