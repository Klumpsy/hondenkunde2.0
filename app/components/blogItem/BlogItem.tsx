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
      className={`relative flex flex-col items-start ${className} p-3 hover:shadow-md transition-shadow duration-300 ease-in-out h-full`}
    >
      {isNew(blogItem.created) && (
        <span className="absolute top-0 left-0 bg-orange text-darkBlue p-1 rounded font-bold">
          Nieuw
        </span>
      )}
      <Image
        src={imageUrl}
        alt="blog post image"
        width={500}
        height={300}
        className="object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56"
      />
      <div className="w-full flex flex-wrap justify-start items-center mt-4 border-t-2 pt-5">
        {blogItem.tags &&
          blogItem.tags.map((tag) => (
            <p
              key={tag + blogItem.id}
              className={`m-2 flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}
            >
              {tag}
            </p>
          ))}
      </div>
      <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
        {blogItem.title}
      </h2>
      <div
        className="text-sm text-black flex-grow"
        dangerouslySetInnerHTML={{ __html: blogItem.introText }}
      ></div>
      <div className="pt-2 pr-0 pb-0 pl-0 flex items-center justify-between w-full">
        <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1 text-darkBlue font-bold">
          {formatDate(blogItem.created)}
        </p>
        <AiOutlineClockCircle className="text-gray-300 ml-3" />
        <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">
          {estimateReadingTime(
            blogItem?.introText +
              blogItem?.textBlockOne +
              blogItem?.textBlockTwo +
              blogItem?.textBlockThree
          )}{" "}
          min
        </p>
        <div className="mr-2 ml-auto flex items-center space-x-1 group hover:bg-gray-200 p-2 rounded">
          <span className="text-xs font-bold group-hover:text-darkBlue text-orange">
            Lees verder
          </span>
          <BsFillArrowRightCircleFill className="text-darkBlue group-hover:text-orange" />
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
