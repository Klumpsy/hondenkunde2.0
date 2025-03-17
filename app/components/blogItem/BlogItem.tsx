"use server";

import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, isNew } from "@/app/helpers/dateHelper";
import { estimateReadingTime } from "@/app/helpers/textHelper";
import { BlogItemProps } from "@/app/definitions/interface/BlogItemPropsInterface";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Link from "next/link";

const BlogItem: React.FC<BlogItemProps> = async ({ blogItem, className }) => {
  const imageUrl = await getFileUrl(blogItem, "introImage");

  return (
    <Link
      href={`/blog/${blogItem.slug}`}
      className={`group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 ${className}`}
    >
      {isNew(blogItem.created) && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-orange text-darkBlue py-1 px-3 rounded-full text-xs font-bold shadow-md inline-block">
            Nieuw
          </span>
        </div>
      )}

      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <Image
          src={imageUrl}
          alt={blogItem.title}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex flex-wrap gap-2 mb-4 -mt-1">
          {blogItem.tags &&
            blogItem.tags.map((tag) => (
              <span
                key={tag + blogItem.id}
                className={`inline-block px-2.5 py-0.5 text-xs font-medium text-white rounded-full ${tag}`}
              >
                {tag}
              </span>
            ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange transition-colors duration-300">
          {blogItem.title}
        </h2>

        <div
          className="text-sm text-gray-600 mb-5 line-clamp-3 flex-grow leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              blogItem.introText.substring(0, 160) +
              (blogItem.introText.length > 160 ? "..." : ""),
          }}
        ></div>

        <div className="flex items-center text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <span className="font-medium">{formatDate(blogItem.created)}</span>
            <span className="mx-2 text-gray-300">•</span>
            <div className="flex items-center">
              <AiOutlineClockCircle className="mr-1 text-gray-400" />
              <span>
                {estimateReadingTime(
                  blogItem?.introText +
                    blogItem?.textBlockOne +
                    blogItem?.textBlockTwo +
                    blogItem?.textBlockThree
                )}{" "}
                min
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center font-medium text-orange group-hover:translate-x-1 transition-transform duration-300">
            <span className="mr-1.5">Lees verder</span>
            <BsFillArrowRightCircleFill className="text-darkBlue group-hover:text-orange transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
