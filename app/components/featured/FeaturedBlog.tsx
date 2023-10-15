import Image from "next/image"
import { getFileUrl } from "@/app/pocketbase/pocketbase";

const FeaturedBlog = async ({blogItem}) => {
    const imageUrl = await getFileUrl(blogItem, 'introImage');

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt="blog post image"
              width={500}
              height={300}
              className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{blogItem.title}</div>
                <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: (blogItem.introText.length > 300 ? blogItem.introText.substring(0, 300) + "..." : blogItem.introText) }}/>
            </div>
            <div className="px-6 pt-4 pb-2">
            <div className="flex space-x-2">
              {blogItem.tags && blogItem.tags.map(tag => (
                  <p key={tag + blogItem.id} 
                      className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}>
                      {tag}
                  </p>
              ))}
          </div>
            </div>
        </div>
    )
}

export default FeaturedBlog