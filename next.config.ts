import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // A listagem /portfolio foi removida: o portfólio vive na seção da home.
  async redirects() {
    return [
      { source: "/portfolio", destination: "/#portfolio", permanent: true },
      { source: "/pt/portfolio", destination: "/pt#portfolio", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
