import type { NextConfig } from "next";

const originalCatalog = "https://catalogo-uomo-lavras.sebasgoleiro0320.chatgpt.site";

// Mantém a hero e a logo originais do catálogo UOMO.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/uomo/hero-cinza.webp",
        destination: `${originalCatalog}/uomo/hero-cinza.webp`,
      },
      {
        source: "/uomo/hero-cinza.png",
        destination: `${originalCatalog}/uomo/hero-cinza.png`,
      },
      {
        source: "/uomo/logo.png",
        destination: `${originalCatalog}/uomo/logo.png`,
      },
    ];
  },
};

export default nextConfig;
