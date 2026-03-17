import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";
import { notFound } from "next/navigation";

// Rich text rendering options to handle text AND embedded images
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", lineHeight: "1.7" }}>{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem" }}>
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: any) => (
      <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
        {children}
      </h3>
    ),
    // This handles images inserted directly into the Rich Text body in Contentful
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      return (
        <div style={{ margin: "2.5rem 0", textAlign: "center" }}>
          <img
            src={`https:${file.url}`}
            alt={title || "Blog image"}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              display: "block",
            }}
          />
          {title && (
            <figcaption style={{ 
              marginTop: "0.75rem", 
              fontSize: "0.9rem", 
              color: "#666",
              fontStyle: "italic" 
            }}>
              {title}
            </figcaption>
          )}
        </div>
      );
    },
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Header Section Consistent with Layout */}
      <header style={{ marginBottom: "3rem", borderBottom: "1px solid #eee", paddingBottom: "1.5rem" }}>
        <h1 style={{ margin: "0 0 0.25rem 0", fontSize: "1.8rem" }}>
          Introductory Biomedical Imaging
        </h1>
        <p style={{ margin: "0 0 1rem 0", fontSize: "1rem", color: "#444", fontWeight: "500" }}>
          Bethe A. Scalettar & James R. Abney
        </p>
        <h2 style={{ margin: "0 0 1.5rem