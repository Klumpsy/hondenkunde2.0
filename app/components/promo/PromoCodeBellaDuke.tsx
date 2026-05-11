"use client";

import React from "react";
import Image from "next/image";
import CopyPartnerPromoCode from "../partnerPromo/CopyPartnerPromoCode";

const AFFILIATE_URL =
  "https://www.awin1.com/cread.php?awinmid=119495&awinaffid=2782352&ued=https%3A%2F%2Feu.bellaandduke.com%2Fnl%2F";

const PromoCodeBellaDuke = () => {
  return (
    <section className="mb-10 mt-5 p-5 flex flex-col lg:flex-row justify-between bg-gray-800 rounded-lg">
      <div className="flex justify-center items-center h-full">
        <Image
          src="/images/bella_duke_promo.png"
          className="rounded-lg"
          width={550}
          height={458}
          alt="Bella & Duke promo banner"
        />
      </div>
      <div className="justify-center flex flex-col m-0 mt-6 p-1 md:m-5 md:pl-5 sm:text-left">
        <p className="text-white mb-4">
          Onze partner
          <a
            href={AFFILIATE_URL}
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            Bella &amp; Duke
          </a>
          maakt vers, rauw hondenvoer en geeft nieuwe klanten in Nederland en
          België een aantrekkelijke startkorting: 40% op de eerste box, 30% op
          de tweede en 20% op de derde. Klik op
          <a
            href={AFFILIATE_URL}
            className="text-orange font-bold ml-1 mr-1 hover:text-yellow-400"
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            deze link
          </a>
          en voer bij het afrekenen de volgende code in{" "}
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
            style={{ width: "auto", height: "auto" }}
            alt="Arti"
          />
          <CopyPartnerPromoCode promoCode="AFF432" />
        </div>
      </div>
    </section>
  );
};

export default PromoCodeBellaDuke;
