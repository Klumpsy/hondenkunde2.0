const getSingleBlog = async (blogId: string) => {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/blogs/records/${blogId}`, 
    {
        next: {revalidate: 10}
    });

    const data = await res.json();
    return data;
};

const BlogDetail = async ({params}: any) => {
const blog = await getSingleBlog(params.id)

    return (
        <div>
             <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                {blog.title}
            </h1>
            <div className="flex flex-wrap justify-starts items-center mt-4 border-t-2 pt-5">
                {blog?.tags.map((tag) => (
                     <div key={blog.id + tag} className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-200 rounded-2xl">
                          {tag}
                      </div>
                ))}
            </div>
            <div dangerouslySetInnerHTML={{__html: blog.content}}>
             
            </div> 
        </div>
    )
}

export default BlogDetail;