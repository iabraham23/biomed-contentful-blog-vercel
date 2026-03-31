import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Introductory Biomedical Imaging - Blog",
  description: "By Bethe A. Scalettar & James R. Abney",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <div className="site-header__branding">
              <h1 className="site-header__title">Introductory Biomedical Imaging</h1>
              <p className="site-header__authors">Bethe A. Scalettar &amp; James R. Abney</p>
            </div>
            <nav className="site-header__nav">
              <span className="site-header__section-label">Blog</span>
              <a
                href="https://www.introbiomedicalimaging.org/"
                className="site-header__back-link"
              >
                ← Back to main site
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
