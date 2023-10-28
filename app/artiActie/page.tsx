import Header from "../components/header/Header";
import PromoCodeHondenShop from "../components/promo/PromoCodeHondenShop";
import { BsQuote } from "react-icons/bs";

export default async function ArtiRating() {
  return (
    <>
      <Header
        imageName="banner_3.jpg"
        linkHref="https://www.hondenshop.nl/partner/hondenkunde/"
        titleText="Arti's Promo's"
        anchorText="Bekijk Arti's favoriete shop"
      />
      <div className="container mx-auto px-4 max-w-[1200px] ">
        <section className="bg-white p-6 rounded-md shadow-md mx-auto mt-12 mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Promocodes voor hondenartikelen
          </h2>
          <p className="text-gray-700 mb-4">
            Gebruik onderstaande promotiecodes om korting of een gratis artikel
            te krijgen bij één van onze partners. Of je nu op zoek bent naar
            speelgoed, voeding of accessoires voor jouw hond, je vindt het
            allemaal via onderstaande site(s). Wij werken enkel samen met sites
            waarbij wij (een deel van) het assortiment zelf, of eigenlijk onze
            Friese Stabij Arti, naar tevredenheid getest hebben.
          </p>

          <blockquote className="p-4 bg-gray-800  text-orange rounded-md text-gray-600 italic mb-4">
            <p>
              <BsQuote className="inline align-top mr-1" />
              Met een promotiecode geniet je voordelig van de hondenartikelen op
              Arti&apos;s favoriete websites
              <BsQuote className="inline align-top ml-1 transform scale-x-[-1]" />
            </p>
          </blockquote>
          <p className="text-gray-700">
            We hebben regelmatig leuke acties waar je gebruik van kunt maken.
            Bekijk hieronder de actieve promo&apos;s.
          </p>
        </section>
        <section>
          <h2 className="text-4xl font-extrabold text-orange mb-6">
            Actieve promo&apos;s
          </h2>
        </section>

        <PromoCodeHondenShop />
      </div>
    </>
  );
}
