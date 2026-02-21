"use client";

import React from "react";
import Link from "next/link";

// TODO: Replace with your actual MedPets affiliate link and banner image
const MEDPETS_AFFILIATE_URL = "https://www.medpets.nl/";

const PromoCodeMedPets = () => {
  return (
    <section className="mb-10 mt-5 p-6 flex flex-col lg:flex-row items-center gap-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
      {/* Icon / logo placeholder */}
      <div className="flex-shrink-0 w-24 h-24 rounded-full bg-darkBlue border-4 border-orange flex items-center justify-center text-4xl shadow-lg">
        🐾
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-orange font-extrabold text-xl mb-2">
          Arti's tip: MedPets
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Op zoek naar kwalitatief hondenvoer, supplementen of reisbenodigd­heden
          voor jouw hond? Arti raadt{" "}
          <Link
            href={MEDPETS_AFFILIATE_URL}
            className="text-orange font-bold hover:text-yellow-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            MedPets.nl
          </Link>{" "}
          aan — een groot assortiment voor gezonde en gelukkige honden.
        </p>
        <Link
          href={MEDPETS_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange/90 text-darkBlue font-bold py-3 px-6 rounded-xl shadow-lg hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 hover:scale-105 transform"
        >
          Bekijk MedPets.nl →
        </Link>
      </div>
    </section>
  );
};

export default PromoCodeMedPets;
