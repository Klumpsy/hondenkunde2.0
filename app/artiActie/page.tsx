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
            Promocodes zijn speciale codes die u kunt gebruiken om korting te
            krijgen op diverse hondenartikelen. Of u nu op zoek bent naar
            speelgoed, voeding of accessoires voor uw hond, met een promotiecode
            kunt u profiteren van exclusieve kortingen of leuke cadeaus bij
            deelnemende winkels.
          </p>

          <blockquote className="p-4 bg-gray-800  text-orange rounded-md text-gray-600 italic mb-4">
            <p>
              <BsQuote className="inline align-top mr-1" />
              Met de juiste promotiecode kan uw hond genieten van de beste
              producten zonder dat u de volle prijs hoeft te betalen!
              <BsQuote className="inline align-top ml-1 transform scale-x-[-1]" />
            </p>
          </blockquote>
          <p className="text-gray-700">
            We hebben regelmatig leuke acties en promo's waar u gebruik van kunt
            maken dus kom af en toe even langs op de site om te kijken of er wat
            voor uw hond tussen zit.
          </p>
        </section>
        <section>
          <h2 className="text-4xl font-extrabold text-orange mb-6">
            Actieve promo's
          </h2>
        </section>

        <PromoCodeHondenShop />
      </div>
    </>
  );
}
