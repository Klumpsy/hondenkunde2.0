import Image from "next/image";
import Link from "next/link";
import { getFileUrlRatingItem } from "@/app/pocketbase/pocketbase";
import RatingBone from "./RatingBone";
import { RatingItemInterface } from "@/app/definitions/interface/RatingItemPropsInterface";

const RatingCard: React.FC<{ ratingItem: RatingItemInterface }> = async ({
  ratingItem,
}) => {
  const imageUrl = await getFileUrlRatingItem(ratingItem, "coverImage");

  return (
    <Link href={`/artiRating/${ratingItem.slug}`}>
      <div className="block h-[640px] overflow-hidden">
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
          <div className="relative h-[300px] rounded-t-lg overflow-hidden flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="Rating"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-orange flex-none">
              {ratingItem.title}
            </h5>
            <p
              className="mb-3 text-sm text-gray-700 dark:text-gray-400 flex-grow overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html:
                  ratingItem.explanationText.length > 200
                    ? ratingItem.explanationText.substring(0, 200) + "..."
                    : ratingItem.explanationText,
              }}
            />
            <p className="dark:text-orange mb-3 flex-none">
              Beoordeeld door: {ratingItem.ratedBy}
            </p>
            <RatingBone
              rating={ratingItem.rating}
              ratedBy={ratingItem.ratedBy}
            />
            <button
              className="inline-block mt-7 px-4 py-2 bg-darkBlue text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500 flex-none"
              style={{ maxWidth: "250px" }}
            >
              Bekijk product
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RatingCard;
