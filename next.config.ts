import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b8c324bfc986460fbdb1c9667951568a.r2.dev",
        pathname: "/assets/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
