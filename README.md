# Contentful Blog (Next.js)

testing!!!

A minimal blog powered by Next.js and Contentful.

## Contentful Setup

1. Create a free account at [contentful.com](https://www.contentful.com/)
2. Create a new space
3. Create a **Content Model** called `Blog Post` with API ID `blogPost` and these fields:
   - `title` — Short text
   - `slug` — Short text (under Appearance, select "Slug")
   - `date` — Date & time
   - `excerpt` — Short text (optional)
   - `body` — Rich text
4. Publish at least one blog post entry
5. Go to **Settings → API Keys**, create a key, and copy the Space ID and Content Delivery API access token

## Local Development

```bash
cp .env.local.example .env.local
# Fill in your Contentful credentials in .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Add `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` as Environment Variables
4. Deploy

To add a subdomain like `blog.yoursite.com`, go to your Vercel project Settings → Domains and add it.

## Main Site Integration

If your main site needs to show the latest blog posts, fetch them from the blog app instead of querying Contentful directly from the static site:

`https://blog.introbiomedicalimaging.org/api/posts`

That endpoint returns the latest posts in a stable shape:

```json
{
  "posts": [
    {
      "slug": "example-post",
      "title": "Example Post",
      "date": "2026-03-12T00:00:00.000Z",
      "excerpt": "Short summary",
      "imageUrl": "https://images.ctfassets.net/...",
      "imageAlt": "Example image",
      "url": "/posts/example-post"
    }
  ]
}
```

This avoids coupling the main site to Contentful field names such as `image` vs `images`, and it keeps Contentful-specific logic inside the blog app.
