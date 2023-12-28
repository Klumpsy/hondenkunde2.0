import React from "react";
import Image from "next/image";
import CopyPromoCode from "./CopyPromoCode";

const PromoCodeHondenShop = () => {
  return (
    <section className="mb-10 mt-5 p-5 flex flex-col lg:flex-row justify-between bg-gray-800 rounded-lg">
      <div className="flex justify-center items-center h-full">
        <Image
          src="/images/medium_promo.webp"
          className="rounded-lg"
          width={550}
          height={550}
          alt="Hondenshop promo banner"
        />
      </div>
      <div className="justify-center flex flex-col m-0 mt-6 p-1 md:m-5 md:pl-5 sm:text-left">
        <p className="text-white mb-4">
          In samenwerking met
          <a
            href="https://www.hondenshop.nl/partner/hondenkunde/"
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
            target="_blank"
          >
            Hondenshop.nl
          </a>
          mag onze hond Arti jullie een leuk cadeau geven bij aankoop van
          minimaal 10 euro. Hoe gaat dit in zijn werk? Heel simpel, klik op
          <a
            href="https://www.hondenshop.nl/partner/hondenkunde/"
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
            target="_blank"
          >
            deze link
          </a>
          en voer bij het uitchecken de volgende code in{" "}
          <span className="text-gray-200 opacity-70">
            (je kunt op de code klikken om deze te kopiëren)
          </span>
          :
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Image
            src="/images/arti_mini.jpg"
            className="rounded-full"
            width={80}
            height={80}
            alt="Rated by dog"
          />
          <CopyPromoCode />
        </div>
      </div>
    </section>
  );
};

export default PromoCodeHondenShop;
