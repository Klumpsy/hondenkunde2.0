import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";

const BlogItem = async ({blogItem}: any) => {

    const imageUrl = await getFileUrl(blogItem);

    return (
        <div className="mt-10 p-2 w2/5 shadow-lg rounded-lg h-[500px] w-80 md:w-90 cursor-pointer m-auto p-3 bg-indigo-50 transition duration-500 ease-in-out transform hover:translate-y-5 hover:shadow-2xl flex flex-col">
            <a href={`/blog/${blogItem.id}`} className="w-full flex-grow flex flex-col relative">
                <Image
                    src={imageUrl || undefined}  // provide a fallback in case imageUrl is null
                    alt="blog post image"
                    width={"280"}
                    height={"60"}
                    className="relative mb-4"
                />
                <div className="w-full flex flex-col justify-between flex-grow">
                    <div>
                        <h2 className={blogItem.title.length > 30 ? "blog_post_card_title_small" : "blog_post_card_title"}>
                            {blogItem.title}
                        </h2>
    
                        <div className="text-gray-600 dark:text-gray-900 font-light text-md" 
                        dangerouslySetInnerHTML={{ __html: blogItem.content.substring(0, 100) + '...' }}>
                        </div>
                        <span className='read_on_tag'>lees meer</span>
                    </div>
                    <div className="mt-auto"> {/* This pushes the tags to the bottom */}
                        <div className="flex flex-wrap justify-center items-center border-t-2 pt-5">
                            {blogItem.tags.map((tag) => (
                                <div key={blogItem.id + tag} className={`text-xs mr-2 py-1.5 px-4 text-gray-600 ${tag} rounded-2xl m-1`}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )};

export default BlogItem;