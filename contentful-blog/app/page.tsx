import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/contentful";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <h1 className="mb-10 text-4xl font-bold">Blog</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No posts yet. Add some in Contentful!</p>
      )}

      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            {post.coverImage && (
              <Link href={`/posts/${post.slug}`}>
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.title}
                  width={post.coverImage.width}
                  height={post.coverImage.height}
                  className="mb-4 rounded-lg"
                />
              </Link>
            )}

            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold group-hover:underline">
                {post.title}
              </h2>
            </Link>

            <time className="mt-1 block text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            {post.excerpt && (
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
