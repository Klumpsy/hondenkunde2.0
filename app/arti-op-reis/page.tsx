import { Metadata } from "next";
import Header from "../components/header/Header";
import TravelCard from "../components/travelCard/TravelCard";
import TravelMapClient from "../components/travelMap/TravelMapClient";
import { getTravels, getTravelFileUrl } from "../pocketbase/pocketbase";

export const metadata: Metadata = {
  title: "Arti op reis | Hondenkunde.nl",
  description:
    "Ontdek alle avonturen van Arti! Van de Ardennen tot Texel en de Moezel — bekijk waar Arti allemaal geweest is op de interactieve reiskaart.",
};

const ArtiOpReis = async () => {
  const travels = await getTravels();

  const travelsWithUrls = await Promise.all(
    (travels || []).map(async (travel: any) => {
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
      location: t.location,
      latitude: Number(t.latitude),
      longitude: Number(t.longitude),
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        imageName="banner6.jpeg"
        linkHref="/artiRating"
        titleText="Arti op reis"
        anchorText="Bekijk Arti's rating"
      />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
            Alle reizen op de kaart
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Klik op een markering om meer te lezen over Arti&apos;s avontuur op
            die bestemming.
          </p>
        </div>

        {mapLocations.length > 0 ? (
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <TravelMapClient
              travels={mapLocations}
              center={[51.5, 8.0]}
              zoom={5}
              height="520px"
            />
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-800 h-[400px] flex items-center justify-center text-gray-400">
            <p className="text-center text-sm font-medium">
              Nog geen reizen toegevoegd.
            </p>
          </div>
        )}
      </section>

      {/* Cards grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
            Alle bestemmingen
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Van strand tot gebergte — Arti heeft ze allemaal verkend. Lees alles
            over onze avonturen.
          </p>
        </div>

        {travelsWithUrls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelsWithUrls.map((travel: any) => (
              <TravelCard
                key={travel.id}
                travel={{
                  id: travel.id,
                  title: travel.title,
                  slug: travel.slug,
                  country: travel.country,
                  location: travel.location,
                  visitDate: travel.visitDate,
                  introText: travel.introText,
                  coverImageUrl: travel.coverImageUrl,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">
              Arti gaat binnenkort op avontuur!
            </p>
            <p className="text-sm mt-2">
              Kom snel terug voor de eerste reisverhalen.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtiOpReis;
