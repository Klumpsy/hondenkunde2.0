import { Metadata } from "next";
import Header from "../components/header/Header";
import PartnerCard from "../components/partnerCard/PartnerCard";
import { getPartners } from "../pocketbase/pocketbase";

export const metadata: Metadata = {
  title: "Partners | Hondenkunde.nl",
  description:
    "Ontdek de partners van Hondenkunde.nl — zorgvuldig geselecteerde hondenshops en merken die Arti persoonlijk aanbeveelt. Profiteer van exclusieve kortingen en promo codes.",
};

const PartnersPage = async () => {
  const partners = await getPartners();

  return (
    <div>
      <Header
        imageName="banner_14.jpeg"
        linkHref="/partners"
        titleText="Onze Partners"
        anchorText="Bekijk alle partners"
      />

      <div className="bg-gradient-to-b from-gray-50 to-white py-10">
        <div className="container mx-auto px-4 max-w-screen-xl">

          {/* Intro text for SEO */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Door Arti aanbevolen partners
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Bij Hondenkunde.nl werken we samen met een selecte groep partners en merken die wij persoonlijk vertrouwen.
              Elke partner is door ons, en natuurlijk door Arti zelf beoordeeld op kwaliteit, betrouwbaarheid en het aanbod voor jouw hond.
              Via onze partners profiteer je vaak van exclusieve kortingscodes en speciale aanbiedingen.
            </p>
      
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Binnenkort meer partners beschikbaar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl mx-auto anim-stagger">
              {partners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          )}

          {/* Bottom SEO content */}
          <div className="max-w-3xl mx-auto text-center mt-16 pt-10 border-t border-gray-200">
            <p className="text-gray-500 text-sm leading-relaxed">
              Hondenkunde.nl werkt uitsluitend samen met partners die passen bij de waarden van ons als hondenliefhebbers.
              Alle aanbevelingen zijn gebaseerd op echte ervaringen. We streven ernaar om alleen de beste producten en diensten aan te bieden voor jou en je trouwe viervoeter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
