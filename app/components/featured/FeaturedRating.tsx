import Image from "next/image";
import { getFileUrlRatingItem } from "@/app/pocketbase/pocketbase";
import { RatingItemInterface } from "@/app/definitions/interface/ratingItemPropsInterface";

const FeaturedRating: React.FC<{ ratingItem: RatingItemInterface }> = async ({
  ratingItem,
}) => {
  const imageUrl = await getFileUrlRatingItem(ratingItem, "coverImage");

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
        <div className="font-bold text-xl mb-2">{ratingItem.title}</div>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html:
              ratingItem.explanationText.length > 300
                ? ratingItem.explanationText.substring(0, 300) + "..."
                : ratingItem.explanationText,
          }}
        />
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex space-x-2">
          {ratingItem.tags &&
            ratingItem.tags.map((tag) => (
              <p
                key={tag + ratingItem.id}
                className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}
              >
                {tag}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRating;
