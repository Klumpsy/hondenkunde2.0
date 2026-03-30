import { getBlogs, getRatingItems, getTravels, getCountries, getPartners } from "./pocketbase/pocketbase";

export default async function sitemaps() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const blogPosts = await getBlogs();
    const blogPostUrls = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date()
    }));

    const ratingItems = await getRatingItems();
    const ratingItemUrls = ratingItems.items.map(ratingItem => ({
        url: `${baseUrl}/artiRating/${ratingItem.slug}`,
        lastModified: new Date()
    }));

    const [travels, countries, partners] = await Promise.all([getTravels(), getCountries(), getPartners()]);

    const countryUrls = (countries || []).map((country: any) => ({
        url: `${baseUrl}/vakantie-met-hond/${country.slug}`,
        lastModified: new Date()
    }));

    const travelUrls = (travels || [])
        .filter((t: any) => t.countrySlug)
        .map((travel: any) => ({
            url: `${baseUrl}/vakantie-met-hond/${travel.countrySlug}/${travel.slug}`,
            lastModified: new Date()
        }));

    const partnerUrls = (partners || []).map((partner: any) => ({
        url: `${baseUrl}/partners/${partner.slug}`,
        lastModified: new Date()
    }));

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/blog`, lastModified: new Date() },
        { url: `${baseUrl}/artiActie`, lastModified: new Date() },
        { url: `${baseUrl}/artiRating`, lastModified: new Date() },
        { url: `${baseUrl}/vakantie-met-hond`, lastModified: new Date() },
        { url: `${baseUrl}/partners`, lastModified: new Date() },
        ...blogPostUrls,
        ...ratingItemUrls,
        ...countryUrls,
        ...travelUrls,
        ...partnerUrls,
    ];
}
