"use server";

import Image from "next/image";
import Link from "next/link";
import htmlTruncate from "html-truncate";
import { getFileUrlRatingItem } from "@/app/pocketbase/pocketbase";
import RatingBone from "./RatingBone";
import { RatingItemInterface } from "@/app/definitions/interface/RatingItemPropsInterface";

const RatingCard: React.FC<{ ratingItem: RatingItemInterface }> = async ({
  ratingItem,
}) => {
  const imageUrl = await getFileUrlRatingItem(ratingItem, "coverImage");
  const truncatedExplanation = htmlTruncate(ratingItem.shortText, 160);

  return (
    <div className="group w-full" suppressHydrationWarning>
      <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-orange/50 overflow-hidden">

        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={ratingItem.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient: covers full height on hover via the darkening layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/95" />
          <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/30 transition-all duration-500" />

          {/* Tags overlaid on the image */}
          {ratingItem.tags && ratingItem.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
              {ratingItem.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-orange/90 text-darkBlue backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">

          <h5 className="text-xl font-bold text-orange group-hover:text-orange/90 transition-colors duration-300 line-clamp-2 leading-tight mb-3">
            {ratingItem.title}
          </h5>

          <div
            className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3 min-h-[3.6rem]"
            dangerouslySetInnerHTML={{
              __html: truncatedExplanation,
            }}
          />

          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/50">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                Beoordeeld door
              </p>
              <p className="text-orange font-semibold text-sm">{ratingItem.ratedBy}</p>
            </div>
          </div>

          <div className="mb-4">
            <RatingBone rating={ratingItem.rating} ratedBy={ratingItem.ratedBy} />
          </div>

          <Link
            href={`/artiRating/${ratingItem.slug}`}
            className="block w-full px-5 py-3 font-bold bg-gradient-to-r from-orange to-orange/90 text-darkBlue text-sm uppercase rounded-lg focus:outline-none hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 text-center shadow-md hover:shadow-orange/30 hover:scale-[1.02] transform"
          >
            Bekijk product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
