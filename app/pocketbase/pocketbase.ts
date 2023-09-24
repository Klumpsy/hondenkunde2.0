import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090');

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
        `http://127.0.0.1:8090/api/collections/blogs/records?filter=(title~'${search.toLowerCase()}' || content~'${search.toLowerCase()}')&page=${page}&perPage=${limit}`, 
        { 
            cache: "no-store"
        }
    );
    const data = await res.json();

    return data?.items as any[];
}


export const getSingleBlog = async (blogId: string) => {
    
    const res = await fetch(`http://127.0.0.1:8090/api/collections/blogs/records/${blogId}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await res.json();
      return data;
}

export const getFileUrl = async (blogItem: any) => {
    const singleBlog = await getSingleBlog(blogItem.id);
    const url = pb.getFileUrl(singleBlog, singleBlog.image);
    
    return url;
}
