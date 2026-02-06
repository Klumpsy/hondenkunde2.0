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
      className={`group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 hover:border-orange/30 transform hover:-translate-y-1 ${className}`}
    >
      {isNew(blogItem.created) && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-orange to-orange/90 text-white py-1.5 px-4 rounded-full text-xs font-bold shadow-lg inline-block animate-pulse">
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
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 group-hover:to-black/60 transition-all duration-300"></div>
      </div>

      <div className="flex flex-col flex-grow p-6">

        <div className="flex flex-wrap gap-2 mb-4 -mt-1">
          {blogItem.tags &&
            blogItem.tags.map((tag) => (
              <span
                key={tag + blogItem.id}
                className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full shadow-sm ${tag} transition-transform duration-300 hover:scale-105`}
              >
                {tag}
              </span>
            ))}
        </div>


        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange transition-colors duration-300 leading-tight">
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

        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">{formatDate(blogItem.created)}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <div className="flex items-center gap-1.5">
              <AiOutlineClockCircle className="text-gray-400 text-sm" />
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

          <div className="flex items-center font-semibold text-orange group-hover:gap-2 gap-1 transition-all duration-300">
            <span className="text-xs">Lees meer</span>
            <BsFillArrowRightCircleFill className="text-darkBlue group-hover:text-orange transition-all duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;