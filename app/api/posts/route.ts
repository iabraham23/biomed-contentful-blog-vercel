import { getAllPosts } from "@/lib/contentful";

export async function GET() {
  const posts = await getAllPosts();

  return Response.json({
    posts: posts.slice(0, 5).map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl || null,
      imageAlt: post.imageAlt || post.title,
      url: `/posts/${post.slug}`,
    })),
  });
}
