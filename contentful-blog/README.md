# Contentful Blog

A minimal Next.js blog powered by Contentful.

## Contentful Setup

1. Create a free account at [contentful.com](https://www.contentful.com)
2. Create a new **Space**
3. Go to **Content model** → **Add content type** and create one called **Blog Post** with API ID `blogPost`
4. Add these fields to the Blog Post content type:

   | Field Name  | Field Type       | Field ID     | Notes                        |
   |-------------|------------------|-------------|------------------------------|
   | Title       | Short text       | `title`     | Required                     |
   | Slug        | Short text       | `slug`      | Required, unique             |
   | Excerpt     | Short text (long)| `excerpt`   | Summary for the listing page |
   | Date        | Date & time      | `date`      |                              |
   | Body        | Rich text        | `body`      | The post content             |
   | Cover Image | Media (1 file)   | `coverImage`| Optional                     |
   | Author      | Reference        | `author`    | Optional, see below          |

5. (Optional) Create an **Author** content type with fields: `name` (short text) and `picture` (media)
6. Go to **Settings → API keys** → **Add API key** and copy the **Space ID** and **Content Delivery API access token**

## Local Development

```bash
cp .env.example .env.local
# Fill in your Contentful credentials in .env.local

npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add environment variables: `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`
4. Deploy

To use a subdomain like `blog.yoursite.com`, go to your project's **Settings → Domains** and add it.
