import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Link from "next/link";
import { notFound } from "next/navigation";

// Rich text rendering options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p>{children}</p>
    ),

    [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
      <h1>{children}</h1>
    ),

    [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
      <h2>{children}</h2>
    ),

    [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
      <h3>{children}</h3>
    ),

    [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
      <h4>{children}</h4>
    ),

    [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
      <ul>{children}</ul>
    ),

    [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
      <ol>{children}</ol>
    ),

    [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
      <li>{children}</li>
    ),

    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote>{children}</blockquote>
    ),

    [BLOCKS.HR]: () => <hr />,

    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, file, description } = node?.data?.target?.fields || {};
      const imageUrl = file?.url;

      if (!imageUrl) return null;

      const finalUrl = imageUrl.startsWith("//")
        ? `https:${imageUrl}`
        : imageUrl;

      return (
        <figure>
          <img
            src={finalUrl}
            alt={description || title || "Embedded image"}
          />
          {(description || title) && (
            <figcaption>{description || title}</figcaption>
          )}
        </figure>
      );
    },

    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="post-article-wrapper">
      <Link href="/" className="post-article__back">
        ← Back to all posts
      </Link>

      <article>
        <header className="post-article__header">
          <h1 className="post-article__title">{post.title}</h1>
          <div className="post-article__meta-row">
            <time className="post-article__date" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.authorName && (
              <span className="post-article__author">By {post.authorName}</span>
            )}
          </div>
        </header>

        {post.imageUrl && (
          <div className="post-article__hero">
            <img src={post.imageUrl} alt={post.imageAlt || post.title} />
          </div>
        )}

        <div className="post-content">
          {documentToReactComponents(post.body, richTextOptions)}
        </div>

        <footer className="post-article__footer">
          <Link href="/" className="post-article__back">
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}
