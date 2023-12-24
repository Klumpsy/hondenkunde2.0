import {
  getFileUrlRatingItem,
  getSingleRatingItem,
  getFileUrlsForProductImages,
  getRatingItems,
} from "@/app/pocketbase/pocketbase";
import Link from "next/link";
import Image from "next/image";
import RatingBone from "@/app/components/ratingCard/RatingBone";
import Slider from "@/app/components/slider/Slider";
import { extractVideoID } from "@/app/helpers/videoHelper";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ratingItems = await getRatingItems();

  return ratingItems.map((ratingItem) => ({
    slug: ratingItem.slug,
  }));
}

export async function generateMetaData({ params }: any) {
  const ratingDetail = await getSingleRatingItem(params.slug);

  if (!ratingDetail) notFound();

  return {
    title: ratingDetail.title,
  };
}

const RatingDetail = async ({ params }: any) => {
  const ratingDetail = await getSingleRatingItem(params.slug);

  if (!ratingDetail) notFound();

  const coverImageUrl = await getFileUrlRatingItem(ratingDetail, "coverImage");
  const urls = await getFileUrlsForProductImages(ratingDetail);

  return (
    <div
      className="bg-gray-900 py-8 pt-12 min-h-screen"
      suppressHydrationWarning
    >
      <div className="flex items-start max-w-[1100px] mx-auto mb-5">
        <Link
          href="/artiRating"
          className="ml-2 hover:bg-orange hover:text-darkBlue font-extrabold mb-4 bg-orange text-darkBlue py-2 px-4 rounded-full shadow-md transition z-10"
        >
          Terug naar overzicht
        </Link>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4 z-1">
            <div className="relative h-[470px] rounded-lg bg-gray-300 mb-4 overflow-hidden">
              <Image
                src={coverImageUrl}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                className="absolute"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 bg-gray-900 p-4">
            <h2 className="text-2xl font-bold mb-2 text-orange">
              {ratingDetail.title}
            </h2>
            <div className="mb-4">
              <span className="font-bold text-gray-700 text-white">
                Beoordeeld door{" "}
                <span className="text-orange">{ratingDetail.ratedBy} </span>:
              </span>
              <div className="flex items-center mt-2 text-white">
                <RatingBone
                  rating={ratingDetail.rating}
                  ratedBy={ratingDetail.ratedBy}
                />
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 text-white">
                Over dit product:
              </span>
              <p
                className="text-gray-600 text-sm mt-2 text-white dynamic_text_input"
                dangerouslySetInnerHTML={{
                  __html: ratingDetail.explanationText,
                }}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {ratingDetail.blogUrl && (
                <div className=" min-w-0 px-2 mt-4">
                  <Link
                    href={ratingDetail.blogUrl}
                    className="mt-3 w-full bg-orange text-darkBlue py-2 px-4 rounded-full font-bold hover:bg-yellow-500 hover:text-white text-center"
                  >
                    {ratingDetail.blogButtonText}
                  </Link>
                </div>
              )}
              {ratingDetail.buttonUrl && (
                <div className="min-w-0 px-2 mt-4">
                  <Link
                    href={ratingDetail.buttonUrl}
                    target="_blank"
                    className="mt-3 w-full bg-green-700 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 hover:text-white text-center"
                  >
                    {ratingDetail.buttonText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-between max-w-[1100px] w-full">
          <div className="mt-7 w-full md:w-1/2 p-3">
            <Slider imagePaths={urls} />
          </div>

          {ratingDetail.productVideo && (
            <div className="mt-7 w-full md:w-1/2 p-3">
              <h3 className="mb-2 mt-4 text-orange text-2xl font-extrabold">
                {ratingDetail.ratedBy} in actie:
              </h3>
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${extractVideoID(
                    ratingDetail.productVideo
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingDetail;
