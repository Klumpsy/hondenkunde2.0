# Hondenkunde Blog Creator

## When to use
When the user asks to create/write a blog for hondenkunde, or says something like "make a blog", "schrijf een blog", "new blog post".

## Instructions

You are creating a blog post for hondenkunde.nl — a Dutch dog knowledge website run by a family with a Friese Stabij named **Arti**. Follow these steps in order:

### Step 1: Fetch existing blogs and products

Run these two commands in parallel to understand what content already exists:

**Fetch all blogs:**
```bash
curl -s "https://spoiled-stone.pockethost.io/api/collections/blogs/records?perPage=100&fields=title,slug,tags&sort=-created" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const j=JSON.parse(d);j.items.forEach(i=>console.log('- '+i.title+' | slug: '+i.slug+' | tags: ['+i.tags.join(', ')+']'))"
```

**Fetch all products (ratingItems):**
```bash
curl -s "https://spoiled-stone.pockethost.io/api/collections/ratingItems/records?perPage=100&fields=title,slug,tags&sort=-created" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');const j=JSON.parse(d);j.items.forEach(i=>console.log('- '+i.title+' | slug: '+i.slug+' | tags: ['+i.tags.join(', ')+']'))"
```

### Step 2: Research a topic

Using WebSearch, search for dog-related topics in Dutch that have:
- **High search volume** — topics people are actually searching for
- **Low competition** — not overly saturated
- **Relevance** to the products/ratingItems on the site (e.g., if the site reviews dog chews, a blog about "beste kauwbotten voor honden" is highly relevant)
- **Not already covered** by existing blogs (check the list from Step 1)

Search queries to try (adapt based on what products exist):
- "honden blog onderwerpen 2025 2026"
- "populaire honden zoekwoorden nederland"
- Topics related to the product categories found in Step 1

Present the user with 3 topic suggestions including:
- Topic title (in Dutch)
- Why it's a good fit (relevance to products, search potential)
- Estimated search interest

**Wait for the user to pick a topic or suggest their own before continuing.**

### Step 3: Research the chosen topic

Use WebSearch to gather factual, accurate information about the chosen topic. Search for:
- Expert veterinary/cynologist sources
- Common questions people ask about this topic
- Related products on the hondenkunde site that could be naturally linked

### Step 4: Write the blog post

Write the blog in Dutch following this exact structure. The tone should be:
- Friendly, knowledgeable, accessible
- Written as if by a passionate dog owner who has done their research
- Not overly formal, but trustworthy
- SEO-optimized with natural keyword usage
- NEVER use em dashes (—) or en dashes (–) in the text. Use commas, periods, or restructure the sentence instead. Dashes are a dead giveaway for AI-written content.

**Blog structure (matching PocketBase schema):**

```json
{
  "slug": "kebab-case-dutch-title",
  "title": "Catchy Dutch Title With Primary Keyword",
  "introText": "2-3 paragraph introduction that hooks the reader and includes the primary keyword naturally. Should make the reader want to continue reading.",
  "textBlockOne": "3-4 paragraphs of detailed content for section 1. Use <br><br> for paragraph breaks.",
  "subTitleOne": "Subtitle for section 1 (include secondary keyword)",
  "textBlockTwo": "3-4 paragraphs of detailed content for section 2. Use <br><br> for paragraph breaks.",
  "subTitleTwo": "Subtitle for section 2",
  "textBlockThree": "3-4 paragraphs of detailed content for section 3. Use <br><br> for paragraph breaks.",
  "subTitleThree": "Subtitle for section 3",
  "tags": ["Relevant", "Tags", "From", "Existing", "Tag", "List"],
  "featured": false,
  "published": false,
  "metaDataDescription": "SEO meta description, 150-160 characters, includes primary keyword",
  "showBanner": true
}
```

**Important content rules:**
- Each text block should be substantial (200-400 words)
- Total blog length: 800-1500 words
- Use `<br><br>` for paragraph breaks within text blocks (this is how they render)
- Tags should come from the existing tag list when possible
- The slug must be unique (check against existing slugs from Step 1)
- Include practical tips dog owners can use
- videoBlockOne/Two/Three and blogUrl/blogButtonText are optional — only include if relevant YouTube videos are found

### CRITICAL: Personal touch with Arti

Every blog MUST include personal experiences and anecdotes from the perspective of Arti's owners. Arti is a **Friese Stabij** (Stabyhoun). Weave in 2-3 personal touches throughout the blog, for example:
- "Onze Friese Stabij Arti is dol op..." 
- "Toen we Arti voor het eerst een ... gaven, merkten we dat..."
- "Als eigenaren van een Friese Stabij weten we uit ervaring dat..."
- "Bij Arti zien we duidelijk het verschil wanneer..."

These should feel natural, not forced. They add authenticity and make the blog personal. Arti is female.

### CRITICAL: Internal linking

Every blog MUST include internal links to relevant content on the hondenkunde website. Use HTML anchor tags since the text blocks support HTML.

**Link to relevant blogs:**
- Format: `<a href="https://www.hondenkunde.nl/blog/[slug]">[anchor text]</a>`
- Check the existing blog list from Step 1 and link to 1-3 related blogs where it makes sense naturally in the text.

**Link to relevant product reviews (Arti's Rating):**
- Format: `<a href="https://www.hondenkunde.nl/artiRating/[slug]">[anchor text]</a>`
- Check the existing product list from Step 1 and link to 1-3 related products where relevant.

### CRITICAL: Affiliate linking

Every blog MUST include affiliate links where relevant. There are two affiliate partners:

**1. Hondenshop.nl — for all product-related content (snacks, speelgoed, voer, accessoires, etc.)**
- Base affiliate URL: `https://www.hondenshop.nl/partner/hondenkunde`
- You can link to ANY page on hondenshop.nl by appending `/partner/hondenkunde` to the URL path
- Examples:
  - Homepage: `https://www.hondenshop.nl/partner/hondenkunde`
  - Category page: `https://www.hondenshop.nl/product-categorie/kauwsnacks/partner/hondenkunde`
  - Search/specific: `https://www.hondenshop.nl/product-categorie/kong-speelgoed/partner/hondenkunde`
- Use WebSearch to find actual product category URLs on hondenshop.nl, then append `/partner/hondenkunde`
- Include 1-3 hondenshop links per blog where natural
- Promo code: **CADEAU-VAN-ARTI** — mention this once per blog when linking to hondenshop ("Gebruik code CADEAU-VAN-ARTI voor een extraatje bij je bestelling!")
- Format: `<a href="[affiliate-url]" target="_blank" rel="noopener">[anchor text]</a>`

**2. Petsecur — ONLY for insurance/verzekering-related content**
- Affiliate URL: `https://www.awin1.com/cread.php?awinmid=112028&awinaffid=2782352&ued=https%3A%2F%2Fpetsecur.nl%2F`
- Premium calculator: `https://www.awin1.com/cread.php?awinmid=112028&awinaffid=2782352&ued=https%3A%2F%2Fpetsecur.nl%2Faanvraag-hond%2F`
- Only use these links when the blog topic is about dog insurance, health costs, or veterinary expenses
- Format: `<a href="[affiliate-url]" target="_blank" rel="noopener">[anchor text]</a>`

### Step 5: Present to user for review

Show the user the full blog post content in a readable format. Ask if they want any changes.

### Step 6: Create the blog in PocketBase

Once approved, create the blog record using the PocketBase admin credentials from .env (POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD).

First authenticate and then create:
```bash
# Read credentials from .env
source .env

# Authenticate and get token
AUTH_TOKEN=$(curl -s "https://spoiled-stone.pockethost.io/api/admins/auth-with-password" \
  -H "Content-Type: application/json" \
  -d "{\"identity\":\"$POCKETBASE_ADMIN_EMAIL\",\"password\":\"$POCKETBASE_ADMIN_PASSWORD\"}" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8');console.log(JSON.parse(d).token)")

# Create the blog record
curl -s "https://spoiled-stone.pockethost.io/api/collections/blogs/records" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d '$BLOG_JSON'
```

### Step 7: Remind about images and publishing

After creation, remind the user:
- "Blog is created as a **draft** (published=false). To publish it:"
  1. Go to PocketBase admin -> blogs -> find the new blog
  2. Upload images: `introImage` (hero/header), `imageBlockOne/Two/Three` (optional section images)
  3. Review the content
  4. Set `published` to `true`
- Suggest what kind of images would work well for each section

## Notes
- Always write in Dutch (Netherlands, not Belgian)
- The PocketBase URL is: https://spoiled-stone.pockethost.io
- The website URL is: https://www.hondenkunde.nl
- The blog page on the site is at: /blog
- Individual blogs are at: /blog/[slug]
- Product reviews are at: /artiRating/[slug]
- Partners page: /partners
- Existing tags can be fetched from: https://spoiled-stone.pockethost.io/api/collections/blogs/records?fields=tags&perPage=200
