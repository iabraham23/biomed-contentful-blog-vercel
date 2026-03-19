import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";
import { notFound } from "next/navigation";

// Rich text rendering options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>{children}</p>
    ),

    [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        {children}
      </h2>
    ),

    [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginTop: "1.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {children}
      </h3>
    ),

    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      console.log("EMBEDDED_ASSET node:", node);
      console.log(
        "EMBEDDED_ASSET target fields:",
        node?.data?.target?.fields
      );

      const { title, file, description } = node?.data?.target?.fields || {};
      const imageUrl = file?.url;

      console.log("EMBEDDED_ASSET parsed values:", {
        title,
        description,
        file,
        imageUrl,
      });

      if (!imageUrl) {
        console.log("EMBEDDED_ASSET: no imageUrl found, returning null");
        return null;
      }

      const finalUrl = imageUrl.startsWith("//")
        ? `https:${imageUrl}`
        : imageUrl;

      console.log("EMBEDDED_ASSET finalUrl:", finalUrl);

      return (
        <figure style={{ margin: "2rem 0" }}>
          <img
            src={finalUrl}
            alt={description || title || "Embedded image"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "0.5rem",
            }}
          />
          {(description || title) && (
            <figcaption
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "#666",
                textAlign: "center",
              }}
            >
              {description || title}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  console.log("generateStaticParams posts:", posts);

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  console.log("generateMetadata params:", params);

  const post = await getPostBySlug(params.slug);
  console.log("generateMetadata post:", post);

  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("PostPage params:", params);

  const post = await getPostBySlug(params.slug);
  console.log("PostPage full post:", post);
  console.log("PostPage post.body:", post?.body);
  console.log(
    "PostPage post.body stringified:",
    JSON.stringify(post?.body, null, 2)
  );

  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem" }}
      >
        ← Back to all posts
      </Link>

      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
          lineHeight: 1.2,
        }}
      >
        {post.title}
      </h1>

      <time
        style={{
          color: "#666",
          fontSize: "0.9rem",
          display: "block",
          marginBottom: "2rem",
        }}
        dateTime={post.date}
      >
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      {post.authorName && (
        <p
          style={{
            color: "#444",
            fontSize: "0.95rem",
            marginTop: "-1.25rem",
            marginBottom: "2rem",
          }}
        >
          By {post.authorName}
        </p>
      )}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          style={{
            width: "100%",
            maxHeight: "420px",
            objectFit: "cover",
            display: "block",
            marginBottom: "2rem",
            borderRadius: "0.5rem",
          }}
        />
      )}

      <div>{documentToReactComponents(post.body, richTextOptions)}</div>
    </article>
  );
}