import Image from "next/image";
import Link from "next/link";

export interface CountryCardData {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  travelCount: number;
}

const CountryCard = ({ country }: { country: CountryCardData }) => {
  return (
    <Link href={`/vakantie-met-hond/${country.slug}`} className="group block h-full">
      <article
        className="relative h-full rounded-2xl overflow-hidden border-2 border-[#da9e00] shadow-lg
                   hover:shadow-2xl hover:border-[#da9e00]/70 hover:-translate-y-1
                   transition-all duration-300"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={country.coverImageUrl}
            alt={country.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

          {country.travelCount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#da9e00] text-darkBlue text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {country.travelCount}{" "}
                {country.travelCount === 1 ? "bestemming" : "bestemmingen"}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <h3 className="text-white font-extrabold text-2xl leading-tight drop-shadow-lg">
              {country.name}
            </h3>
          </div>
        </div>

        <div className="bg-white px-5 py-4">
          {country.description && (
            <div className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3" dangerouslySetInnerHTML={{
            __html:
              country.description.substring(0, 160) +
              (country.description.length > 160 ? "..." : ""),
          }}>
            </div>
          )}

          <span className="text-[#da9e00] font-bold text-sm group-hover:translate-x-1 transition-transform duration-200 inline-block">
            Bekijk bestemmingen →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
