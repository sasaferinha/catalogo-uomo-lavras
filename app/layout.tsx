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
          .product-card {
            background: #121212 !important;
            color: #ffffff !important;
            border: 1px solid #2d2d2d !important;
            border-bottom: 3px solid #c7a45a !important;
          }
          .product-card .product-info {
            background: #121212 !important;
            color: #ffffff !important;
          }
          .product-card .product-info > p {
            color: #e0c784 !important;
          }
          .product-card .product-info small {
            color: #bdbdbd !important;
          }
          .product-card .product-info > div {
            border-top-color: #333333 !important;
          }
          .product-card .product-info strong {
            color: #ffffff !important;
          }
          .product-card .product-info button {
            color: #ffffff !important;
            border-bottom-color: #c7a45a !important;
          }
          .product-card .photo-upload {
            background: #121212 !important;
            color: #e0c784 !important;
            border-left-color: #c7a45a !important;
          }
          @media (max-width: 900px) {
            .hero .hero-accessibility-image { object-position: 64% center !important; }
          }
          @media (max-width: 560px) {
            .hero .hero-accessibility-image { object-position: 72% top !important; }
            .product-modal {
              background: #080808 !important;
              color: #ffffff !important;
              border-color: #c7a45a !important;
            }
            .product-modal .modal-gallery {
              height: clamp(340px, 52vh, 500px) !important;
              min-height: 340px !important;
              background: #121212 !important;
              border-bottom: 1px solid #c7a45a !important;
            }
            .product-modal .modal-gallery > img {
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
              object-position: center !important;
            }
            .product-modal .modal-details {
              background: #080808 !important;
            }
            .product-modal .modal-close {
              background: #121212 !important;
              color: #e0c784 !important;
              border-color: #c7a45a !important;
            }
            .product-modal .modal-category,
            .product-modal .color-heading span,
            .product-modal .size-heading span {
              color: #e0c784 !important;
            }
            .product-modal .modal-note,
            .product-modal .modal-price span,
            .product-modal .quantity-row span,
            .product-modal .product-benefits {
              color: #bdbdbd !important;
            }
            .product-modal .modal-price {
              border-color: #333333 !important;
            }
            .product-modal .color-options button,
            .product-modal .size-options button {
              background: #171717 !important;
              color: #ffffff !important;
              border-color: #3a3a3a !important;
            }
            .product-modal .color-options button.selected,
            .product-modal .size-options button.selected {
              background: #c7a45a !important;
              color: #080808 !important;
              border-color: #e0c784 !important;
            }
            .product-modal .quantity-control {
              border-color: #3a3a3a !important;
            }
            .product-modal .quantity-control button,
            .product-modal .quantity-control output {
              background: #171717 !important;
              color: #ffffff !important;
              border-color: #3a3a3a !important;
            }
            .product-modal .add-to-cart {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background: #c7a45a !important;
              color: #080808 !important;
              border-bottom-color: #e0c784 !important;
            }
            .product-modal .add-to-cart.disabled {
              opacity: .45 !important;
            }
            .product-modal .size-warning {
              color: #e0c784 !important;
            }
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
