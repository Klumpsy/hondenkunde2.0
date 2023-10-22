import { getBlogs, getRatingItems } from "./pocketbase/pocketbase";

export default async function sitemaps() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const blogPosts = await getBlogs({
        page: 1,
        limit: 100,
        search: "",
        tags: []
      });

      const blogPostUrls = blogPosts.map(post => {
        return {
            url: `${baseUrl}/blog/${post.slug}`
        }
      });

    const ratingItems = await getRatingItems()
    const ratingItemUrls = blogPosts.map(ratingItem => {
        return {
            url: `${baseUrl}/artiRating/${ratingItem.slug}`
        }
      });

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        }
    ]
}
