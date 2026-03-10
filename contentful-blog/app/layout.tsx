import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "A blog powered by Contentful and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <div className="mx-auto max-w-3xl px-6 py-12">{children}</div>
      </body>
    </html>
  );
}
