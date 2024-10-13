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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RatingItem } from "@/app/components/filter/types";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ratingItems = await getRatingItems();

  return ratingItems.items.map((ratingItem: RatingItem) => ({
    slug: ratingItem.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const ratingDetail = await getSingleRatingItem(params.slug);

  if (!ratingDetail) notFound();

  return {
    title: `${ratingDetail.title} | Hondenkunde`,
    description: ratingDetail.metaDataDescription,
  };
}

const RatingDetail = async ({ params }: any) => {
  const ratingDetail = await getSingleRatingItem(params.slug);

  if (!ratingDetail) notFound();

  const coverImageUrl = await getFileUrlRatingItem(ratingDetail, "coverImage");
  const urls = await getFileUrlsForProductImages(ratingDetail);

  return (
    <div className="p-4 sm:p-4 bg-blue-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[1200px] mb-4 mt-4">
        <Link
          href="/artiRating"
          className="back_button_blog font-extrabold bg-orange text-darkBlue py-3 px-5 rounded-full shadow-md hover:bg-gray-800 hover:text-orange transition"
        >
          <ArrowBackIcon className="mr-2" />
          Terug naar overzicht
        </Link>
      </div>

      <div className="container mx-auto p-4 rounded-lg max-w-[1200px]">
        <div className="bg-gray-900 shadow-lg rounded-lg p-4 flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-2 z-1">
            <div className="relative w-full h-[470px] rounded-lg bg-gray-300 mb-4 overflow-hidden shadow-md">
              <Image
                src={coverImageUrl}
                alt="Product Image"
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4 p-6 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-2 text-orange">
              {ratingDetail.title}
            </h2>

            <div className="mb-4">
              <span className="font-bold text-gray-400">
                Beoordeeld door{" "}
                <span className="text-orange">{ratingDetail.ratedBy}</span>:
              </span>
              <div className="flex items-center mt-2">
                <RatingBone
                  rating={ratingDetail.rating}
                  ratedBy={ratingDetail.ratedBy}
                />
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-400">Over dit product:</span>
              <div
                className="text-gray-300 text-sm mt-2 dynamic_text_input"
                dangerouslySetInnerHTML={{
                  __html: ratingDetail.explanationText,
                }}
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {ratingDetail.blogUrl && (
                <div className="min-w-0 px-2 mt-4">
                  <Link
                    href={ratingDetail.blogUrl}
                    className="w-full bg-orange text-darkBlue py-2 px-4 rounded-full font-bold hover:bg-yellow-500 hover:text-white text-center"
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
                    className="w-full bg-green-700 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 hover:text-white text-center"
                  >
                    {ratingDetail.buttonText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 w-full max-w-[1200px]">
        <div className="flex flex-wrap justify-between w-full">
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
