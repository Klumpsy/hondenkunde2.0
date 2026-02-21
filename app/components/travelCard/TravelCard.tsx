import Image from "next/image";
import Link from "next/link";

export interface TravelCardData {
  id: string;
  title: string;
  slug: string;
  country: string;
  countrySlug: string;
  location: string;
  visitDate: string;
  introText: string;
  coverImageUrl: string;
}

const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "").trim() ?? "";

const TravelCard = ({ travel }: { travel: TravelCardData }) => {
  const formattedDate = travel.visitDate
    ? new Date(travel.visitDate).toLocaleDateString("nl-NL", {
        month: "long",
        year: "numeric",
      })
    : "";

  const plainIntro = stripHtml(travel.introText);

  return (
    <Link href={`/vakantie-met-hond/${travel.countrySlug}/${travel.slug}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
        {/* Cover image — object-cover handles both portrait and landscape consistently */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={travel.coverImageUrl}
            alt={travel.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="bg-orange text-darkBlue text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {travel.country}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-gray-900 font-extrabold text-lg mb-1 group-hover:text-orange transition-colors duration-200 leading-tight">
            {travel.title}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{travel.location}</p>
          {plainIntro && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {plainIntro}
            </p>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            {formattedDate && (
              <span className="text-xs text-gray-400 font-medium">
                {formattedDate}
              </span>
            )}
            <span className="ml-auto text-orange font-bold text-sm group-hover:translate-x-1 transition-transform duration-200">
              Bekijk reis →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TravelCard;
