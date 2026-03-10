import { createClient } from "contentful";
import { Document } from "@contentful/rich-text-types";

// Types
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  body: Document;
  date: string;
  coverImage?: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
  author?: {
    name: string;
    picture?: { url: string };
  };
}

// Client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to parse a Contentful entry into our BlogPost type
function parsePost(entry: any): BlogPost {
  const fields = entry.fields;
  const coverAsset = fields.coverImage?.fields;
  const authorFields = fields.author?.fields;

  return {
    title: fields.title ?? "",
    slug: fields.slug ?? "",
    excerpt: fields.excerpt ?? "",
    body: fields.body ?? { nodeType: "document", content: [], data: {} },
    date: fields.date ?? entry.sys.createdAt,
    coverImage: coverAsset
      ? {
          url: `https:${coverAsset.file.url}`,
          title: coverAsset.title ?? "",
          width: coverAsset.file.details.image?.width ?? 800,
          height: coverAsset.file.details.image?.height ?? 400,
        }
      : undefined,
    author: authorFields
      ? {
          name: authorFields.name ?? "",
          picture: authorFields.picture?.fields
            ? { url: `https:${authorFields.picture.fields.file.url}` }
            : undefined,
        }
      : undefined,
  };
}

// Fetch all posts (sorted by date, newest first)
export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: "blogPost",
    order: ["-fields.date"],
    include: 2,
  });

  return entries.items.map(parsePost);
}

// Fetch a single post by slug
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const entries = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });

  if (entries.items.length === 0) return undefined;
  return parsePost(entries.items[0]);
}
