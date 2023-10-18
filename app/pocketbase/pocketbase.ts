import PocketBase from 'pocketbase'

const pb = new PocketBase(`${process.env.NEXT_DB_BASE_URL}`);

export const getBlogs = async ({
    page = 1,
    limit = 100,
    search = "",
    tags = []
}: {
    page?: number,
    limit?: number,
    search?: string,
    tags?: string
}) => {
    let url = `${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?page=${page}&perPage=${limit}`;

    let filterString = '';

    if (search) {
        filterString += `(title~'${search.toLowerCase()}' || introText~'${search.toLowerCase()}')`;
    }

    if (tags.length > 0) {
        const tagsArray = tags[0].split(',');
        const tagsFilterString = tagsArray.map(tag => `tags~'${tag}'`).join(' || ');
        filterString = filterString ? `(${filterString}) && (${tagsFilterString})` : `(${tagsFilterString})`;
    }

    if (filterString) {
        url += `&filter=${filterString}`;
    }

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return data?.items as any[];
}

export const getRatingItems = async () => {

    const res = await fetch(
        `${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records?page=1&perPage=100`, 
        { 
            cache: "no-store"
        }
    );
    const data = await res.json();


    return data?.items as any[];
}


export const getSingleBlog = async (slug: string) => {
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records/?filter=(slug='${slug}')`,
        {
          next: {
             revalidate: 60 
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
            revalidate: 10 
        },
        }
      );
     
      const data = await res.json();
      return data.items[0];
}

export const getFeaturedBlog = async () => {
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/blogs/records?filter=(featured=true)`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await res.json();
      return data.items[0];
}

export const getFeaturedItem = async () => {
    
    const res = await fetch(`${process.env.NEXT_DB_BASE_URL}/api/collections/ratingItems/records/?filter=(featured=true)`,
        {
          next: { revalidate: 10 },
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