"use server";

import Image from "next/image";
import Link from "next/link";
import { Partner } from "@/app/definitions/interface/PartnerInterface";
import { getPartnerFileUrl } from "@/app/pocketbase/pocketbase";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const PartnerCard: React.FC<{ partner: Partner }> = async ({ partner }) => {
  const logoUrl = partner.logo
    ? await getPartnerFileUrl(partner, "logo")
    : null;

  const usps = [partner.uspOne, partner.uspTwo, partner.uspThree].filter(Boolean);

  return (
    <div className="group w-full">
      <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-orange/50 overflow-hidden h-full">

        {/* Logo area */}
        <div className="relative flex items-center justify-center bg-white p-6 min-h-[140px]">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${partner.name} logo`}
              width={160}
              height={80}
              className="object-contain max-h-[80px] w-auto transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-20">
              <span className="text-2xl font-extrabold text-gray-800">{partner.name}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h5 className="text-xl font-bold text-orange group-hover:text-orange/90 transition-colors duration-300 leading-tight mb-2">
            {partner.name}
          </h5>

          {partner.tagline && (
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{partner.tagline}</p>
          )}

          {usps.length > 0 && (
            <ul className="space-y-1.5 mb-5 flex-1">
              {usps.map((usp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <FaCheckCircle className="text-orange mt-0.5 flex-shrink-0 text-xs" />
                  <span>{usp}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/partners/${partner.slug}`}
            className="mt-auto flex items-center justify-center gap-2 w-full px-5 py-3 font-bold bg-gradient-to-r from-orange to-orange/90 text-darkBlue text-sm uppercase rounded-lg hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 text-center shadow-md hover:shadow-orange/30 hover:scale-[1.02] transform"
          >
            Bekijk partner
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
