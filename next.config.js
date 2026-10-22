/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/aniversariopart3uwu' : '',
  },
  ...(isGitHubPages ? {
    output: 'export',
    basePath: '/aniversariopart3uwu',
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

module.exports = nextConfig;
