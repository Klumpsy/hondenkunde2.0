import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";
import TravelMapClient from "@/app/components/travelMap/TravelMapClient";
import TravelCard from "@/app/components/travelCard/TravelCard";
import FilterBar from "@/app/components/filter/FilterBar";
import {
  getCountries,
  getSingleCountry,
  getTravelsByCountry,
  getCountryFileUrl,
  getTravelFileUrl,
} from "@/app/pocketbase/pocketbase";

interface CountryParams {
  countrySlug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CountryParams>;
}): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = await getSingleCountry(countrySlug);
  if (!country) return {};
  return {
    title: `${country.name} | Vakantie met hond | Hondenkunde.nl`,
    description:
      country.description ||
      `Alle bestemmingen in ${country.name} die Arti heeft bezocht.`,
  };
}

export async function generateStaticParams() {
  const countries = await getCountries();
  if (!countries) return [];
  return countries.map((c: any) => ({ countrySlug: c.slug }));
}

const CountryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<CountryParams>;
  searchParams: Promise<{ search?: string }>;
}) => {
  const { countrySlug } = await params;
  const { search = "" } = await searchParams;

  const [country, rawTravels] = await Promise.all([
    getSingleCountry(countrySlug),
    getTravelsByCountry(countrySlug, search),
  ]);

  if (!country) notFound();

  const travelList: any[] = rawTravels || [];

  const countryImageUrl = country.coverImage
    ? await getCountryFileUrl(country, "coverImage")
    : "/images/arti1.webp";

  const travelsWithUrls = await Promise.all(
    travelList.map(async (travel: any) => {
      const coverImageUrl = travel.coverImage
        ? await getTravelFileUrl(travel, "coverImage")
        : "/images/arti1.webp";
      return { ...travel, coverImageUrl };
    })
  );

  const mapLocations = travelsWithUrls
    .filter((t: any) => t.latitude && t.longitude)
    .map((t: any) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      country: t.country,
      countrySlug: t.countrySlug,
      location: t.location,
      latitude: Number(t.latitude),
      longitude: Number(t.longitude),
    }));

  const mapCenter: [number, number] =
    mapLocations.length > 0
      ? [
          mapLocations.reduce((s: number, t: any) => s + t.latitude, 0) /
            mapLocations.length,
          mapLocations.reduce((s: number, t: any) => s + t.longitude, 0) /
            mapLocations.length,
        ]
      : [51.5, 8.0];

  return (
    <div className="min-h-screen">

      {/* Fixed full-page background — image fades into dark overlay as user scrolls */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        <Image
          src={countryImageUrl}
          alt={country.name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={80}
          priority
        />
   
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/95 to-gray-900/100" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8">
          <Link
            href="/vakantie-met-hond"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors duration-200 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Alle landen
          </Link>
        </div>

        <div className="py-24 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl mb-5">
              {country.name}
            </h1>
            {country.description && (
              <div className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed" 
              dangerouslySetInnerHTML={{
                   __html: country.description,
                  }}>
              </div>
            )}
            <div className="mt-8">
              <span className="bg-[#da9e00] text-[#14446c] text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
                {travelsWithUrls.length}{" "}
                {travelsWithUrls.length === 1 ? "bestemming" : "bestemmingen"}
              </span>
            </div>
          </div>
        </div>


        <FilterBar
          baseRoute={`/vakantie-met-hond/${countrySlug}`}
          placeholder={`Zoek in ${country.name}...`}
          availableTags={[]}
        />


        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-10">
          <div className="text-center mb-8 anim-fade-up">
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Bestemmingen in {country.name}
            </h2>
            {search && (
              <p className="text-white/60 text-sm">
                Resultaten voor &ldquo;{search}&rdquo;
              </p>
            )}
          </div>

          {travelsWithUrls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 anim-stagger">
              {travelsWithUrls.map((travel: any) => (
                <TravelCard
                  key={travel.id}
                  travel={{
                    id: travel.id,
                    title: travel.title,
                    slug: travel.slug,
                    country: travel.country,
                    countrySlug: travel.countrySlug,
                    location: travel.location,
                    visitDate: travel.visitDate,
                    introText: travel.introText,
                    coverImageUrl: travel.coverImageUrl,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/50">
              <p className="text-lg font-medium">
                {search
                  ? `Geen bestemmingen gevonden voor "${search}".`
                  : "Nog geen bestemmingen voor dit land."}
              </p>
            </div>
          )}
        </section>

        {/* Map */}
        {mapLocations.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
            <div className="text-center mb-6 anim-fade-up">
              <h2 className="text-2xl font-extrabold text-white mb-2">Kaart</h2>
              <p className="text-white/60 text-sm">
                Alle bezochte plekken in {country.name}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 anim-fade-up">
              <TravelMapClient
                travels={mapLocations}
                center={mapCenter}
                zoom={7}
                height="400px"
              />
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default CountryPage;
