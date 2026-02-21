import { Metadata } from "next";
import Header from "../components/header/Header";
import TravelMapClient from "../components/travelMap/TravelMapClient";
import CountryCard, { CountryCardData } from "../components/countryCard/CountryCard";
import {
  getCountries,
  getTravels,
  getCountryFileUrl,
} from "../pocketbase/pocketbase";

export const metadata: Metadata = {
  title: "Vakantie met hond | Hondenkunde.nl",
  description:
    "Ontdek alle landen en bestemmingen waar Arti op vakantie is geweest. Van de Ardennen tot Texel — bekijk de interactieve reiskaart.",
};

const VakantieMetHond = async () => {
  const [countries, travels] = await Promise.all([
    getCountries(),
    getTravels(),
  ]);

  const travelList: any[] = travels || [];
  const countryList: any[] = countries || [];

  const countriesWithUrls: CountryCardData[] = await Promise.all(
    countryList.map(async (country: any) => {
      const coverImageUrl = country.coverImage
        ? await getCountryFileUrl(country, "coverImage")
        : "/images/arti1.webp";
      const travelCount = travelList.filter(
        (t: any) => t.countrySlug === country.slug
      ).length;
      return { id: country.id, name: country.name, slug: country.slug, description: country.description || "", coverImageUrl, travelCount };
    })
  );

  // Map markers — only travels that have coordinates AND a countrySlug
  const mapLocations = travelList
    .filter((t: any) => t.latitude && t.longitude && t.countrySlug)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        imageName="banner6.jpeg"
        linkHref="/artiRating"
        titleText="Vakantie met hond"
        anchorText="Arti's favoriete drinkfles voor onderweg"
      />

      {/* Map section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8 anim-fade-up">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
            De leukste locaties voor een vakantie met je hond
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            De leukste vakanties beleef je samen met je hond. Onze hond Arti is al regelmatig met ons mee geweest op reis en we delen graag onze ervaringen. Kies je voor een vakantie met je hond, dan zijn er wel een aantal zaken om rekening mee te houden. Denk bijvoorbeeld aan hoe jouw hond vervoerd mag worden en welke vaccinaties verplicht zijn voor vertrek. Daarnaast is het natuurlijk belangrijk om een vakantieadres te boeken waar je hond welkom is.  
          </p>
        </div>

        {mapLocations.length > 0 ? (
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 anim-fade-up">
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

      {/* Countries grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10 anim-fade-up">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
            Met je hond op vakantie naar:
          </h2>
        </div>

        {countriesWithUrls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 anim-stagger">
            {countriesWithUrls.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Nog geen landen toegevoegd.</p>
            <p className="text-sm mt-2">Kom snel terug!</p>
          </div>
        )}
      </section>

      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="anim-fade-up">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Goed voorbereid op vakantie met hond
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Op vakantie met je hond? Een goede voorbereiding is het halve werk. Ga goed voorbereid op vakantie met jouw hond en controleer de regels binnen het land waar je op vakantie gaat én eventuele landen waar je doorheen reist. Zorg dat de hond voordat jullie op reis gaan de benodigde vaccinaties heeft gehad. En neem uiteraard een geldig EU-dierenpaspoort mee. Daarnaast is het in veel Europese landen verplicht om je hond vast te zetten tijdens het autorijden. Check de regels per land voordat je vertrekt. 
              </p>
            </div>

            {/* Section 2 */}
            <div className="anim-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Benodigdheden wanneer je met hond op vakantie gaat
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Naast bovenstaande voorbereiding wat betreft vaccinatie en transport, zijn er nog een aantal dingen om zeker niet te vergeten bij een vakantie met hond. Wanneer wij met onze hond Arti op vakantie gaan nemen we in ieder geval haar voer- en waterbak, een aantal speeltjes en knuffels en natuurlijk haar halsband en riem mee. Daarnaast nemen we ook altijd een isovet bed voor haar mee. Deze kleedjes vindt ze heerlijk liggen, nemen weinig plek in beslag en zijn makkelijk uit te wassen na de vakantie. 
              </p>
            </div>

            {/* Section 3 */}
            <div className="anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Handige tips voor vakantie met hond
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Er zijn een aantal items die we graag meenemen als we met onze hond Arti op vakantie gaan. Allereerst zoals hierboven al genoemd een vetbed, hiermee kun je op de vakantielocatie een fijne plek voor de hond creëren. Daarnaast nemen we altijd de Aquadog drinkfles van de Hondenshop mee. Wanneer we onderweg zijn plannen we regelmatig stops en Arti kan dan gemakkelijk water drinken uit deze fles. Tot slot nemen we naast de rollijn van 10 meter ook altijd een korte vaste lijn mee. Zo’n korte lijn is erg handig op drukkere plekken waar je niet in de knoop wilt komen met een lange rollijn. Tijdens de cursus heeft Arti ook geleerd dat ze rustig gaat zitten/liggen wanneer we onze voet op deze korte lijn zetten, heel handig in bijvoorbeeld een restaurant. 
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VakantieMetHond;
