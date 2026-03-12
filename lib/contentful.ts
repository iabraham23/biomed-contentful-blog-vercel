const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

type ContentfulAsset = {
  sys?: {
    id?: string;
    linkType?: string;
    type?: string;
  };
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
    };
  };
};

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
  imageUrl?: string;
  imageAlt?: string;
}

function normalizeAssetUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function buildAssetMap(includes?: any): Map<string, ContentfulAsset> {
  const assets = (includes?.Asset || []) as ContentfulAsset[];
  return new Map<string, ContentfulAsset>(
    assets
      .filter((asset) => typeof asset.sys?.id === "string")
      .map((asset) => [asset.sys!.id!, asset])
  );
}

function resolveAsset(
  field: any,
  assetMap: Map<string, ContentfulAsset>
): ContentfulAsset | null {
  if (!field) return null;
  if (Array.isArray(field)) {
    for (const entry of field) {
      const asset = resolveAsset(entry, assetMap);
      if (asset) return asset;
    }
    return null;
  }

  if (field.fields?.file?.url) {
    return field;
  }

  const assetId =
    field.sys?.linkType === "Asset" || field.sys?.type === "Asset"
      ? field.sys?.id
      : undefined;
  if (!assetId) return null;
  return assetMap.get(assetId) || null;
}

function parsePost(item: any, includes?: any): BlogPost | null {
  const assetMap = buildAssetMap(includes);
  const imageField =
    item.fields.image ??
    item.fields.images ??
    item.fields.heroImage ??
    item.fields.featuredImage;
  const imageAsset = resolveAsset(imageField, assetMap);
  const slug =
    typeof item.fields.slug === "string" ? item.fields.slug.trim() : "";
  const title =
    typeof item.fields.title === "string" ? item.fields.title.trim() : "";

  if (!slug || !title) {
    return null;
  }

  return {
    slug,
    title,
    date: item.fields.date || item.sys.createdAt,
    excerpt: item.fields.excerpt || "",
    body: item.fields.body,
    imageUrl: normalizeAssetUrl(imageAsset?.fields?.file?.url),
    imageAlt:
      imageAsset?.fields?.description ||
      imageAsset?.fields?.title ||
      title,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await fetchContentful(
    `/entries?content_type=blogPost&order=-fields.date&include=2`
  );
  return (data.items || [])
    .map((item: any) => parsePost(item, data.includes))
    .filter((post: BlogPost | null): post is BlogPost => post !== null);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const data = await fetchContentful(
    `/entries?content_type=blogPost&fields.slug=${encodeURIComponent(
      slug
    )}&limit=1&include=2`
  );
  if (!data.items || data.items.length === 0) return null;
  return parsePost(data.items[0], data.includes);
}
