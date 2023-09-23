import PocketBase from 'pocketbase'

export const dynamic = 'auto',
dynamicParams = true,
revalidate = 0,
fetchCache = 'auto',
runtime = 'nodejs',
preferredRegion = 'auto'

const pb = new PocketBase('http://127.0.0.1:8090');

export const getBlogs = async () => {

    const data = await pb.collection('blogs').getList();

    return data?.items as any[];
} 

export const getSingleBlog = async (blogId: string) => {
    
    return await pb.collection('blogs').getOne(blogId);
}

export const getFileUrl = async (blogItem: any) => {
    const singleBlog = await getSingleBlog(blogItem.id);
    const url = pb.getFileUrl(singleBlog, singleBlog.image);
    
    return url;
}
