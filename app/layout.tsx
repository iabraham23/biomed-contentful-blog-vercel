import type { Metadata } from "next";

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
        <header style={{ marginBottom: "3rem", borderBottom: "1px solid #eee", paddingBottom: "1.5rem" }}>
          {/* Main Site Title */}
          <h1 style={{ margin: "0 0 0.25rem 0", fontSize: "1.8rem" }}>
            Introductory Biomedical Imaging
          </h1>
          
          {/* Author Names */}
          <p style={{ margin: "0 0 1rem 0", fontSize: "1rem", color: "#444", fontWeight: "500" }}>
            Bethe A. Scalettar & James R. Abney
          </p>

          {/* Section Subtitle (Bigger) */}
          <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.6rem", color: "#1a1a1a", fontWeight: "700" }}>
            Blogs
          </h2>

          {/* Back Link */}
          <a 
            href="https://www.introbiomedimaging.org/" 
            style={{ 
              textDecoration: "none", 
              color: "#0070f3", 
              fontSize: "0.95rem",
              fontWeight: "500" 
            }}
          >
            ← back to homepage
          </a>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}