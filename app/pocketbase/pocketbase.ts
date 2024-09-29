import PocketBase from 'pocketbase'

const pb = new PocketBase(`${process.env.NEXT_DB_BASE_URL}`);

export const getBlogs = async (search?: string, tags?: string[]) => {
  const page = 1;
  const limit = 100;

  let filter = '';
  
  // Add tag filters to the query if tags are present
  if (tags && tags.length > 0) {
    const tagFilter = tags.map(tag => `tags~'${tag}'`).join(' && ');
    filter += `(${tagFilter})`;
  }

  console.log(search);

  if (search) {
    console.log(search)
    const searchFilter = `(title~'${search}' || introText~'${search}')`;
    filter += filter ? ` && ${searchFilter}` : searchFilter;
  }

  let url = `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?page=${page}&perPage=${limit}&sort=-created`;

  // Append the filter to the URL if any filter is present
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

export const getRatingItems = async (search?: string, tags?: string[]) => {
  const page = 1;
  const limit = 100;

  let filter = '';

  if (tags && tags.length > 0) {
    const tagFilter = tags.map(tag => `tags~'${tag}'`).join(' && ');
    filter += `(${tagFilter})`;
  }

  if (search) {
    const searchFilter = `(title~'${search}' || explanationText~'${search}')`;
    filter += filter ? ` && ${searchFilter}` : searchFilter;
  }

  let url = `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?page=${page}&perPage=${limit}&sort=-created`;

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


export const getSingleBlog = async (slug: string) => {
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records/?filter=(slug='${slug}')`,
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
  
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?filter=(slug='${slug}')`,
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
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?filter=(featured=true)`,
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
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records/?filter=(featured=true)`,
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