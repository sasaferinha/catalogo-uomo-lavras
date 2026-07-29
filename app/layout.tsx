import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo UOMO | Moda Masculina em Lavras",
  description: "Conheça a seleção UOMO de alfaiataria, blazers, camisas e moda casual masculina. Atendimento personalizado em Lavras e para todo o Brasil.",
  icons: { icon: "https://catalogo-uomo-lavras.sebasgoleiro0320.chatgpt.site/uomo/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <style>{`
          .hero .hero-accessibility-image {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            clip: auto !important;
            overflow: visible !important;
            object-fit: cover !important;
            object-position: 4% center !important;
            filter: none !important;
            z-index: 0 !important;
          }
          @media (max-width: 900px) {
            .hero .hero-accessibility-image { object-position: 64% center !important; }
          }
          @media (max-width: 560px) {
            .hero .hero-accessibility-image { object-position: 72% top !important; }
            .product-modal .modal-gallery {
              height: clamp(340px, 52vh, 500px) !important;
              min-height: 340px !important;
            }
            .product-modal .modal-gallery > img {
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
              object-position: center !important;
            }
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
