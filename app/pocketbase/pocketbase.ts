import PocketBase from 'pocketbase'
import { PureComponent } from 'react';

const pb = new PocketBase('https://spoiled-stone.pockethost.io/');

export const getBlogs = async ({
    page = 1,
    limit = 10,
    search = "",
    tags = []
}: {
    page?: number,
    limit?: number,
    search?: string,
    tags?: string[]
}) => {

    const res = await fetch(
        `https://spoiled-stone.pockethost.io/api/collections/blogs/records?filter=(title~'${search.toLowerCase()}' || introText~'${search.toLowerCase()}')&page=${page}&perPage=${limit}`, 
        { 
            cache: "no-store"
        }
    );
    const data = await res.json();

    return data?.items as any[];
}

export const getRatingItems = async () => {

    const res = await fetch(
        `https://spoiled-stone.pockethost.io/api/collections/ratingItems/records?page=1&perPage=100`, 
        { 
            cache: "no-store"
        }
    );
    const data = await res.json();


    return data?.items as any[];
}


export const getSingleBlog = async (blogId: string) => {
    
    const res = await fetch(`https://spoiled-stone.pockethost.io/api/collections/blogs/records/${blogId}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await res.json();
      return data;
}

export const getSingleRatingItem = async (ratingItemId: string) => {
    
    const res = await fetch(`https://spoiled-stone.pockethost.io/api/collections/ratingItems/records/${ratingItemId}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await res.json();
      return data;
}

export const getFileUrl = async (blogItem: any, fileName: string) => {
    const singleBlog = await getSingleBlog(blogItem.id);

    const url = pb.getFileUrl(singleBlog, singleBlog[fileName]);
    
    return url;
}

export const getFileUrlRatingItem = async (ratingItem: any, fileName: string) => {
    const singleRatingItem = await getSingleRatingItem(ratingItem.id);

    const url = pb.getFileUrl(singleRatingItem, singleRatingItem[fileName]);
    
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