import React from "react";
import Image from "next/image";
import CopyPromoCode from "./CopyPromoCode";

const PromoCode = () => {
  return (
    <section className="mb-10 mt-5 p-5 flex flex-col lg:flex-row justify-between bg-gray-800 rounded-lg">
      <div className="pl-0 lg:pl-14 mb-5 lg:mb-0">
        <Image
          src="/images/medium_promo.webp"
          className="ml-0 rounded-lg"
          width={350}
          height={350}
          alt="Hondenshop"
        />
      </div>
      <div className="justify-center flex flex-col m-5">
        <p className="text-white mb-4">
          In samenwerking met
          <a
            href="https://www.hondenshop.nl/partner/hondenkunde/"
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
          >
            Hondenshop.nl
          </a>
          mag onze hond Arti jullie een leuk cadeau geven bij aankoop van
          minimaal 10 euro. Hoe gaat dit in zijn werk? Heel simple, klik op
          <a
            href="https://www.hondenshop.nl/partner/hondenkunde/"
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
          >
            deze link
          </a>
          en voer bij het uitchecken de volgende code in:
        </p>
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/images/employeeOfTheMonth.jpg"
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

export default PromoCode;
