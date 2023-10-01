import { getSingleBlog } from "@/app/pocketbase/pocketbase";
import Link from "next/link";
import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import MediaWithText from "@/app/components/blogItem/MediaWithText";

const BlogDetail = async ({ params }: any) => {
    const blog = await getSingleBlog(params.id);

    const introImageUrl = await getFileUrl(blog, 'introImage');
    const imageBlockOne = await getFileUrl(blog, 'imageBlockOne');
    const imageBlockTwo = await getFileUrl(blog, 'imageBlockTwo');
    const imageBlockThree = await getFileUrl(blog, 'imageBlockThree');

    return (
        <div className="bg-blue-100 p-8">
            <Link href="/blog" className="font-extrabold right-0 md:left-0 md:right-auto top-0 m-4 bg-orange text-darkBlue py-2 px-4 rounded-full shadow-md hover:bg-orange-500 transition">
                 Terug
            </Link>
            
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-[1200px]">
               
                <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                    {blog.title}
                </h1>
                <div className='flex justify-center items-center w-full max-w-full max-h-[400px] overflow-hidden'>
                     <Image
                     src={introImageUrl}
                        alt="blog post image"
                        width={1000} // Original intrinsic width of the image
                        height={600} // Original intrinsic height of the image
                        className="mb-4 object-cover"
                    />
                </div>
                <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
                    {blog.tags && blog.tags.map(tag => (
                        <p key={tag + blog.id} 
                            className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}>
                            {tag}
                        </p>
                         ))}
                </div>
                <div 
                    className="mt-8 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.introText }}>
                </div>
                <div className='blog_content_container'>
                    <MediaWithText
                        mediaSrc={blog.videoBlockOne ? blog.videoBlockOne : imageBlockOne}
                        mediaAlt="blog post media"
                        text={blog.textBlockOne || ''}
                        orientation="left"
                        title={blog.subTitleOne}
                        isVideo={blog.videoBlockOne}
                    />
                    <MediaWithText
                        mediaSrc={blog.videoBlockTwo ? blog.videoBlockTwo : imageBlockTwo}
                        mediaAlt="blog post media"
                        text={blog.textBlockTwo || ''}
                        orientation="right"
                        title={blog.subTitleTwo}
                        isVideo={blog.videoBlockTwo}
                    />
                    <MediaWithText
                        mediaSrc={blog.videoBlockThree ? blog.videoBlockThree : imageBlockThree}
                        mediaAlt="blog post media"
                        text={blog.textBlockThree || ''}
                        orientation="left"
                        title={blog.subTitleThree}
                        isVideo={blog.videoBlockThree}
                    />
                    </div> 
                </div>
            </div>
    );
}

export default BlogDetail;