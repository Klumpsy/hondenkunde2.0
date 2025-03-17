"use server";

import Image from "next/image";
import Link from "next/link";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import { BlogItemInterface } from "@/app/definitions/interface/BlogItemPropsInterface";

const FeaturedBlog: React.FC<{ blogItem: BlogItemInterface }> = async ({
  blogItem,
}) => {
  const imageUrl = await getFileUrl(blogItem, "introImage");

  return (
    <div className="w-full bg-gray-800 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-700">
      <Link
        href={`/blog/${blogItem.slug}`}
        className="flex flex-col sm:flex-row w-full"
      >
        {/* Image section - LEFT */}
        <div className="sm:w-2/5 relative">
          <div className="relative h-72 sm:h-full w-full">
            <Image
              src={imageUrl}
              alt={blogItem.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div>
          </div>
        </div>

        {/* Content section - RIGHT */}
        <div className="sm:w-3/5 p-6 flex flex-col justify-between bg-gray-800 text-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 border-b border-orange/30 pb-3">
              {blogItem.title}
            </h3>
            <div
              className="text-gray-300 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html:
                  blogItem.introText.length > 200
                    ? blogItem.introText.substring(0, 200) + "..."
                    : blogItem.introText,
              }}
            />
          </div>

          {/* Tags section */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {blogItem.tags &&
                blogItem.tags.map((tag) => (
                  <span
                    key={tag + blogItem.id}
                    className={`inline-block px-3 py-1 text-xs font-medium text-gray-50 rounded-full ${tag}`}
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-orange hover:text-orange/80 transition-colors">
              <span className="font-medium">Lees meer over dit artikel</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedBlog;
