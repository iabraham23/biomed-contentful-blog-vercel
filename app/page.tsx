import { getAllPosts } from "@/lib/contentful";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="page-wrapper">
        <p style={{ color: "var(--color-text-muted)" }}>
          No posts yet. Add a blog post in Contentful to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="post-list">
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <Link href={`/posts/${post.slug}`} className="post-card__link">
              {post.imageUrl && (
                <div className="post-card__image-wrap">
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt || post.title}
                    className="post-card__image"
                  />
                </div>
              )}
              <div className="post-card__body">
                <div className="post-card__meta">
                  <time className="post-card__date" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="post-card__title">{post.title}</h2>
                {post.excerpt && (
                  <p className="post-card__excerpt">{post.excerpt}</p>
                )}
                <span className="post-card__read-more">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
