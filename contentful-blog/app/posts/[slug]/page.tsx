import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { getAllPosts, getPostBySlug } from "@/lib/contentful";
import type { Metadata } from "next";

// Rich text rendering options
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: any) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: any) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <ul className="mb-4 list-disc pl-6">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: any) => (
      <ol className="mb-4 list-decimal pl-6">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: any) => (
      <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main>
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900"
      >
        &larr; Back to all posts
      </Link>

      <article>
        <h1 className="mb-2 text-4xl font-bold leading-tight">{post.title}</h1>

        <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author && <span>· {post.author.name}</span>}
        </div>

        {post.coverImage && (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.title}
            width={post.coverImage.width}
            height={post.coverImage.height}
            className="mb-8 rounded-lg"
            priority
          />
        )}

        <div className="prose max-w-none">
          {documentToReactComponents(post.body, richTextOptions)}
        </div>
      </article>
    </main>
  );
}
