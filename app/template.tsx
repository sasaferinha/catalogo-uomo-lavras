import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
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
        }
      `}</style>
      {children}
    </>
  );
}
