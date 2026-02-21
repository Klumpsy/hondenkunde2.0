import { getBlogs, getRatingItems, getTravels } from "./pocketbase/pocketbase";

export default async function sitemaps() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const blogPosts = await getBlogs();

      const blogPostUrls = blogPosts.map(post => {
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date()
        }
      });

    const ratingItems = await getRatingItems()
    const ratingItemUrls = ratingItems.items.map(ratingItem => {
        return {
            url: `${baseUrl}/artiRating/${ratingItem.slug}`,
            lastModified: new Date()
        }
      });

    const travels = await getTravels();
    const travelUrls = (travels || []).map((travel: any) => ({
        url: `${baseUrl}/arti-op-reis/${travel.slug}`,
        lastModified: new Date()
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/artiActie`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/artiRating`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/arti-op-reis`,
            lastModified: new Date()
        },
        ...blogPostUrls,
        ...ratingItemUrls,
        ...travelUrls
    ]
}
