import { getSingleBlog } from "@/app/pocketbase/pocketbase";
import Link from "next/link";

const BlogDetail = async ({ params }: any) => {
    const blog = await getSingleBlog(params.id);

    return (
        <div className="bg-blue-200 p-8">
            <Link href="/blog" className="right-0 md:left-0 md:right-auto top-0 m-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition">
                 Terug
            </Link>
            
            <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg">
               
                <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                    {blog.title}
                </h1>
                <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                    {blog?.tags.map((tag) => (
                        <span key={blog.id + tag} className={`text-xs bg-indigo-200 text-indigo-700 mr-2 ${tag} py-1 px-3 rounded-full`}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div 
                    className="mt-8 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
            </div>
        </div>
    );
}

export default BlogDetail;