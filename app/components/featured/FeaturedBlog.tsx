import Image from "next/image";
import Link from "next/link";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import { BlogItemInterface } from "@/app/definitions/interface/BlogItemPropsInterface";

const FeaturedBlog: React.FC<{ blogItem: BlogItemInterface }> = async ({
  blogItem,
}) => {
  const imageUrl = await getFileUrl(blogItem, "introImage");

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
      <Image
        src={imageUrl}
        alt="blog post image"
        width={500}
        height={300}
        className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blogItem.title}</div>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html:
              blogItem.introText.length > 300
                ? blogItem.introText.substring(0, 300) + "..."
                : blogItem.introText,
          }}
        />
      </div>
      <div className="px-6 pt-4 pb-6">
        <div className="flex space-x-2">
          {blogItem.tags &&
            blogItem.tags.map((tag) => (
              <p
                key={tag + blogItem.id}
                className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}
              >
                {tag}
              </p>
            ))}
        </div>
      </div>
      <Link href={`/blog/${blogItem.slug}`}>
        <button className="w-full bg-darkBlue text-orange py-2 px-4 rounded-b font-bold hover:bg-gray-800">
          Lees verder
        </button>
      </Link>
    </div>
  );
};

export default FeaturedBlog;
