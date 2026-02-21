import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getTravels,
  getSingleTravel,
  getTravelFileUrl,
  getTravelImageUrls,
} from "@/app/pocketbase/pocketbase";
import BackButton from "@/app/components/backButton/BackButton";
import Slider from "@/app/components/slider/Slider";
import TravelMapClient from "@/app/components/travelMap/TravelMapClient";

const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "").trim() ?? "";

interface TravelParams {
  countrySlug: string;
  travelSlug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TravelParams>;
}) {
  const { travelSlug } = await params;
  const travel = await getSingleTravel(travelSlug);

  if (!travel) notFound();

  return {
    title: `${travel.title} | Vakantie met hond | Hondenkunde.nl`,
    description:
      travel.metaDataDescription ||
      `Lees alles over Arti's avontuur in ${travel.location}, ${travel.country}.`,
  };
}

export async function generateStaticParams() {
  const travels = await getTravels();
  if (!travels) return [];
  return travels
    .filter((t: any) => t.countrySlug)
    .map((t: any) => ({ countrySlug: t.countrySlug, travelSlug: t.slug }));
}

const TravelDetail = async ({ params }: { params: Promise<TravelParams> }) => {
  const { countrySlug, travelSlug } = await params;
  const travel = await getSingleTravel(travelSlug);

  if (!travel) notFound();

  const coverImageUrl = travel.coverImage
    ? await getTravelFileUrl(travel, "coverImage")
    : "/images/arti1.webp";
  const galleryUrls = await getTravelImageUrls(travel);

  const formattedDate = travel.visitDate
    ? new Date(travel.visitDate).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const mapLocation =
    travel.latitude && travel.longitude
      ? [
          {
            id: travel.id,
            title: travel.title,
            slug: travel.slug,
            country: travel.country,
            countrySlug: travel.countrySlug || countrySlug,
            location: travel.location,
            latitude: Number(travel.latitude),
            longitude: Number(travel.longitude),
          },
        ]
      : [];

  const plainIntro = stripHtml(travel.introText || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton
          href={`/vakantie-met-hond/${countrySlug}`}
          text={`Terug naar ${travel.country}`}
          className="inline-flex items-center gap-2 font-bold bg-gradient-to-r from-orange to-orange/90 text-darkBlue py-3 px-6 rounded-xl shadow-lg hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 hover:scale-105 transform"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9", maxHeight: "520px" }}>
          <Image
            src={coverImageUrl}
            alt={travel.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-orange text-darkBlue text-xs font-bold px-3 py-1.5 rounded-full">
                {travel.country}
              </span>
              {travel.location && (
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {travel.location}
                </span>
              )}
              {formattedDate && (
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {formattedDate}
                </span>
              )}
            </div>
            <h1 className="text-white font-extrabold text-3xl lg:text-5xl leading-tight drop-shadow-lg">
              {travel.title}
            </h1>
          </div>
        </div>

        {(plainIntro || travel.highlights || (travel.affiliateLink && travel.affiliateLinkText)) && (
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            {plainIntro && (
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {plainIntro}
              </p>
            )}

            {travel.highlights && (
              <div className="p-5 bg-orange/5 rounded-xl border border-orange/20">
                <h3 className="text-orange font-bold text-sm uppercase tracking-wider mb-3">
                  Hoogtepunten
                </h3>
                <div
                  className="text-gray-700 text-sm leading-relaxed dynamic_text_input"
                  dangerouslySetInnerHTML={{ __html: travel.highlights }}
                />
              </div>
            )}

            {travel.affiliateLink && travel.affiliateLinkText && (
              <div className="mt-6">
                <Link
                  href={travel.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:scale-105 transform"
                >
                  {travel.affiliateLinkText}
                </Link>
              </div>
            )}
          </div>
        )}

        {travel.description && (
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
              Arti&apos;s reisverhaal
            </h2>
            <div
              className="text-gray-700 leading-relaxed dynamic_text_input prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: travel.description }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {galleryUrls.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Foto&apos;s van de reis
              </h2>
              <Slider imagePaths={galleryUrls} />
            </div>
          )}

          {mapLocation.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Waar was Arti?
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <TravelMapClient
                  travels={mapLocation}
                  center={[Number(travel.latitude), Number(travel.longitude)]}
                  zoom={9}
                  height="320px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelDetail;