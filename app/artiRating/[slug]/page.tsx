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
import { RatingItem } from "@/app/components/filter/types";
import PromoCodeHondenShop from "@/app/components/promo/PromoCodeHondenShop";
import BackButton from "@/app/components/backButton/BackButton";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ratingItems = await getRatingItems();

  return ratingItems.items.map((ratingItem: RatingItem) => ({
    slug: ratingItem.slug,
  }));
}

interface RatingParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RatingParams>;
}) {
  const resolvedParams = await params;

  const ratingDetail = await getSingleRatingItem(resolvedParams.slug);

  if (!ratingDetail) notFound();

  return {
    title: `${ratingDetail.title} | Hondenkunde`,
    description: ratingDetail.metaDataDescription,
  };
}

const RatingDetail = async ({ params }: { params: Promise<RatingParams> }) => {
  const resolvedParams = await params;

  const ratingDetail = await getSingleRatingItem(resolvedParams.slug);

  if (!ratingDetail) notFound();

  const coverImageUrl = await getFileUrlRatingItem(ratingDetail, "coverImage");
  const urls = await getFileUrlsForProductImages(ratingDetail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton
          href="/artiRating"
          text="Terug naar overzicht"
          className="inline-flex items-center gap-2 font-bold bg-gradient-to-r from-orange to-orange/90 text-darkBlue py-3 px-6 rounded-xl shadow-lg hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 hover:scale-105 transform"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Product Overview */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
              <Image
                src={coverImageUrl}
                alt={ratingDetail.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent lg:hidden"></div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-orange mb-6 leading-tight">
                {ratingDetail.title}
              </h1>

              {/* Rating */}
              <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                  Beoordeeld door
                </p>
                <p className="text-orange font-bold text-lg mb-4">
                  {ratingDetail.ratedBy}
                </p>
                <RatingBone
                  rating={ratingDetail.rating}
                  ratedBy={ratingDetail.ratedBy}
                />
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-300 mb-3">
                  Over dit product
                </h2>
                <div
                  className="text-gray-300 text-sm leading-relaxed dynamic_text_input prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: ratingDetail.explanationText,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {ratingDetail.blogUrl && (
                  <Link
                    href={ratingDetail.blogUrl}
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-orange to-orange/90 text-darkBlue py-3 px-6 rounded-xl font-bold hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 text-center shadow-lg hover:shadow-orange/30 hover:scale-105 transform"
                  >
                    {ratingDetail.blogButtonText}
                  </Link>
                )}
                {ratingDetail.buttonUrl && (
                  <Link
                    href={ratingDetail.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-bold hover:from-green-500 hover:to-green-600 transition-all duration-300 text-center shadow-lg hover:shadow-green-500/30 hover:scale-105 transform"
                  >
                    {ratingDetail.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery & Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Slider */}
          {urls.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Product foto's
              </h2>
              <Slider imagePaths={urls} />
            </div>
          )}

          {/* Video */}
          {ratingDetail.productVideo && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {ratingDetail.ratedBy} in actie
              </h2>
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingTop: "56.25%" }}>
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
        <PromoCodeHondenShop />
      </div>
    </div>
  );
};

export default RatingDetail;