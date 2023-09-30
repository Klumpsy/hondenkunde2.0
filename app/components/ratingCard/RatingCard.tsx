import Image from "next/image";
import Link from "next/link";
import { getFileUrlRatingItem } from "@/app/pocketbase/pocketbase";
import RatingBone from "./RatingBone";

const RatingCard = async ({ ratingItem }) => {

 const imageUrl = await getFileUrlRatingItem(ratingItem, 'coverImage');

  return (
    <Link href={`/artiRating/${ratingItem.id}`} passHref>
    <div className="block">
      <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
        <div className="relative rounded-t-lg">
          <Image 
            src={imageUrl} 
            alt="Rating" 
            layout="responsive"
            width={1920} 
            height={1080} 
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-orange">
            {ratingItem.title}
          </h5>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: ratingItem.explanationText.substring(0, 200) }} />
          <p className="dark:text-orange mb-3">Arti's Rating: </p>
          <RatingBone artisRating={ratingItem.artisRating}/>
          <button className="inline-block mt-7 px-4 py-2 bg-darkBlue text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500" style={{ maxWidth: '250px' }}>
              Bekijk product
          </button>
        </div>
      </div>
    </div>
  </Link>
  );
}

export default RatingCard;