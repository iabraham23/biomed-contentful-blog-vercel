import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Our blog powered by Contentful",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "2rem 1rem",
          lineHeight: 1.6,
          color: "#1a1a1a",
        }}
      >
        <header style={{ marginBottom: "3rem" }}>
          <a
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              textDecoration: "none",
              color: "#1a1a1a",
            }}
          >
            Blog
          </a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
