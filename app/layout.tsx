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
            object-position: center !important;
            filter: none !important;
            z-index: 0 !important;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
