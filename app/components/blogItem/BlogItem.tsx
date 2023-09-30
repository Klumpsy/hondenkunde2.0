import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";

const BlogItem = async ({ blogItem, className }) => {

    const imageUrl = await getFileUrl(blogItem, 'introImage');

    return (
        <a href={`/blog/${blogItem.id}`} className={`flex flex-col items-start ${className} p-3 hover:shadow-md transition-shadow duration-300 ease-in-out`}>
        <Image
            src={imageUrl}
            alt="blog post image"
            width={500}
            height={300}
            className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56"
        />
        <div className="flex space-x-2">
          {blogItem.tags && blogItem.tags.map(tag => (
              <p key={tag + blogItem.id} 
                 className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}>
                  {tag}
              </p>
          ))}
        </div>
        <a className="text-lg font-bold sm:text-xl md:text-2xl">{blogItem.title}</a>
        <div className="text-sm text-black" dangerouslySetInnerHTML={{ __html: blogItem.introText }} />
        <div className="pt-2 pr-0 pb-0 pl-0">
          <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">{blogItem.created}</p>
          <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">{blogItem.readTime} read</p>
        </div>
      </a>
    )};

export default BlogItem;