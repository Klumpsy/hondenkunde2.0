import PocketBase from 'pocketbase'

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


export const getSingleBlog = async (blogId: string) => {
    
    const res = await fetch(`https://spoiled-stone.pockethost.io/api/collections/blogs/records/${blogId}`,
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
