import { getAllPosts } from "@/lib/contentful";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Blog</h1>
        <p>No posts yet. Add a blog post in Contentful to get started.</p>
      </div>
    );
  }
// testing 
  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>All Posts</h1>
      {posts.map((post) => (
        <article
          key={post.slug}
          style={{
            marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <Link
            href={`/posts/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                style={{
                  width: "100%",
                  maxHeight: "320px",
                  objectFit: "cover",
                  display: "block",
                  marginBottom: "1rem",
                  borderRadius: "0.5rem",
                }}
              />
            )}
            <h2
              style={{
                fontSize: "1.4rem",
                marginBottom: "0.25rem",
                fontWeight: 600,
              }}
            >
              {post.title}
            </h2>
          </Link>
          <time
            style={{ color: "#666", fontSize: "0.9rem" }}
            dateTime={post.date}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.excerpt && (
            <p style={{ marginTop: "0.5rem", color: "#444" }}>
              {post.excerpt}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}