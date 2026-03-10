const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

async function fetchContentful(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    next: { revalidate: 60 }, // revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Contentful API error: ${res.status}`);
  }

  return res.json();
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: any; // Contentful rich text document
}

function parsePost(item: any, includes?: any): BlogPost {
  return {
    slug: item.fields.slug,
    title: item.fields.title,
    date: item.fields.date || item.sys.createdAt,
    excerpt: item.fields.excerpt || "",
    body: item.fields.body,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await fetchContentful(
    `/entries?content_type=blogPost&order=-fields.date`
  );
  return (data.items || []).map((item: any) => parsePost(item, data.includes));
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const data = await fetchContentful(
    `/entries?content_type=blogPost&fields.slug=${slug}&limit=1`
  );
  if (!data.items || data.items.length === 0) return null;
  return parsePost(data.items[0], data.includes);
}
