"use server";

import PocketBase from 'pocketbase'
import { RatingItem } from '../components/filter/types';

const pb = new PocketBase(process.env.NEXT_DB_BASE_URL || 'http://127.0.0.1:8090');

export const getBlogs = async (search?: string, tags?: string[]) => {
  const page = 1;
  const limit = 100;

  let filter = '';
  
  if (tags && tags.length > 0) {
    const tagFilter = tags.map(tag => `tags~'${tag}'`).join(' && ');
    filter += `(${tagFilter})`;
  }

  if (search) {
    console.log(search)
    const searchFilter = `(title~'${search}' || introText~'${search}')`;
    filter += filter ? ` && ${searchFilter}` : searchFilter;
  }

  let url = `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?page=${page}&perPage=${limit}&sort=-created`;

  if (filter) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }

  const res = await fetch(url, {
    next: {
      revalidate: 10,
    },
  });
  
  const data = await res.json();
  return data?.items as any[];
};

export const getRatingItems = async (
  search?: string,
  tags?: string[],
  page: number = 1,
  limit: number = 6
): Promise<{ items: RatingItem[], totalPages: number }> => {
  let filter = '';
  const fields = 'id,title,slug,rating,buttonText,buttonUrl,coverImage,ratedBy,shortText,tags,collectionId,collectionName';

  // Optimize tag filter
  if (tags && tags.length > 0) {
    const tagFilter = tags.map(tag => `tags~'${tag}'`).join(' || '); // Less strict "OR" instead of "AND"
    filter += `(${tagFilter})`;
  }

  // Optimize search filter
  if (search) {
    const searchFilter = `(title~'${search}')`;
    filter += filter ? ` && ${searchFilter}` : searchFilter;
  }

  // Construct URL with pagination and fields
  let url = `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?page=${page}&perPage=${limit}&fields=${fields}&sort=-created`;

  if (filter) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }

  try {
    // Add fetch timeout
    const fetchWithTimeout = (url: string, timeout = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      return fetch(url, { 
        signal: controller.signal, 
        next: { revalidate: 10 } 
      }).finally(() => clearTimeout(id));
    };

    console.time('fetchTime');
    const res = await fetchWithTimeout(url);
    console.timeEnd('fetchTime');

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();

    return {
      items: data?.items || [],
      totalPages: Math.ceil(data?.totalItems / limit) || 1,
    };
  } catch (error) {
    console.error('Error fetching rating items:', error);
    return { items: [], totalPages: 0 };
  }
};


export const getSingleBlog = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records/?filter=(slug='${slug}')`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await res.json();
  return data.items[0];
}

export const getSingleRatingItem = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?filter=(slug='${slug}')`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await res.json();
  return data.items[0];
}

export const getFeaturedBlog = async () => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?filter=(featured=true)`,
    {
      next: { 
        revalidate: 10, 
      },
    }
  );
  const data = await res.json();
  return data.items[0];
}

export const getFeaturedItem = async () => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records/?filter=(featured=true)`,
    {
      next: { 
        revalidate: 10,
      },
    }
  );
  const data = await res.json();
  return data.items[0];
}

export const getFileUrl = async (blogItem: any, fileName: string) => {
  const url = pb.getFileUrl(blogItem, blogItem[fileName]);
  return url;
}

export const getFileUrlRatingItem = async (ratingItem: any, fileName: string) => {
  const url = pb.getFileUrl(ratingItem, ratingItem[fileName]);
  return url;
}

export const getFileUrlsForProductImages = async (ratingItem: any) => {
  const productImages = ratingItem.productImages;
  if (!productImages || !Array.isArray(productImages) || productImages.length === 0) {
    return [];
  }

  const urls = await Promise.all(productImages.map(async (image) => {
    return pb.getFileUrl(ratingItem, image);
  }));

  return urls;
}

export const getBlogTags = async (): Promise<string[]> => {
  const url = `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?fields=tags&perPage=200`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();
  const allTags = (data?.items || []).flatMap((item: any) => item.tags || []);
  return [...new Set<string>(allTags)].filter(Boolean).sort();
};

export const getRatingTags = async (): Promise<string[]> => {
  const url = `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?fields=tags&perPage=200`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();
  const allTags = (data?.items || []).flatMap((item: any) => item.tags || []);
  return [...new Set<string>(allTags)].filter(Boolean).sort();
};

export const getCountries = async () => {
  const url = `${process.env.NEXT_DB_BASE_URL}/api/collections/countries/records?sort=name&perPage=100`;
  const res = await fetch(url, { next: { revalidate: 10 } });
  const data = await res.json();
  return data?.items as any[];
};

export const getSingleCountry = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/countries/records?filter=(slug='${slug}')`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data.items[0];
};

export const getTravelsByCountry = async (countrySlug: string, search?: string) => {
  let filter = `(countrySlug='${countrySlug}')`;
  if (search) {
    filter += ` && (title~'${search}' || introText~'${search}')`;
  }
  const url = `${process.env.NEXT_DB_BASE_URL}/api/collections/travels/records?filter=${encodeURIComponent(filter)}&sort=-visitDate&perPage=100`;
  const res = await fetch(url, { next: { revalidate: 10 } });
  const data = await res.json();
  return data?.items as any[];
};

export const getCountryFileUrl = async (country: any, fileName: string) => {
  return pb.getFileUrl(country, country[fileName]);
};

export const getTravels = async () => {
  const url = `${process.env.NEXT_DB_BASE_URL}/api/collections/travels/records?sort=-visitDate&perPage=100`;
  const res = await fetch(url, { next: { revalidate: 10 } });
  const data = await res.json();
  return data?.items as any[];
};

export const getSingleTravel = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_DB_BASE_URL}/api/collections/travels/records?filter=(slug='${slug}')`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data.items[0];
};

export const getTravelFileUrl = async (travel: any, fileName: string) => {
  return pb.getFileUrl(travel, travel[fileName]);
};

export const getTravelImageUrls = async (travel: any) => {
  const images = travel.images;
  if (!images || !Array.isArray(images) || images.length === 0) return [];
  return Promise.all(images.map((image: string) => pb.getFileUrl(travel, image)));
};