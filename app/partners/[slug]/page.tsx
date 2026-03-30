import {
  getPartners,
  getSinglePartner,
  getPartnerFileUrl,
  getPartnerImageUrls,
} from "@/app/pocketbase/pocketbase";
import Image from "next/image";
import Link from "next/link";
import Slider from "@/app/components/slider/Slider";
import { notFound } from "next/navigation";
import { Partner } from "@/app/definitions/interface/PartnerInterface";
import CopyPartnerPromoCode from "@/app/components/partnerPromo/CopyPartnerPromoCode";
import BackButton from "@/app/components/backButton/BackButton";
import { FaCheckCircle, FaExternalLinkAlt, FaTag } from "react-icons/fa";

export const dynamicParams = true;

export async function generateStaticParams() {
  const partners = await getPartners();
  return partners.map((partner: Partner) => ({ slug: partner.slug }));
}

interface PartnerParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PartnerParams>;
}) {
  const resolvedParams = await params;
  const partner = await getSinglePartner(resolvedParams.slug);
  if (!partner) notFound();

  return {
    title: `${partner.name} | Partners | Hondenkunde.nl`,
    description:
      partner.metaDataDescription ||
      `${partner.name} — aanbevolen door Hondenkunde.nl. ${partner.tagline || ""}`,
  };
}

const PartnerDetail = async ({ params }: { params: Promise<PartnerParams> }) => {
  const resolvedParams = await params;
  const partner = await getSinglePartner(resolvedParams.slug);

  if (!partner) notFound();

  const [heroBannerUrl, logoUrl, galleryUrls] = await Promise.all([
    partner.heroBanner ? getPartnerFileUrl(partner, "heroBanner") : Promise.resolve(null),
    partner.logo ? getPartnerFileUrl(partner, "logo") : Promise.resolve(null),
    getPartnerImageUrls(partner),
  ]);

  const usps = [partner.uspOne, partner.uspTwo, partner.uspThree].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: partner.name,
    description: partner.metaDataDescription || partner.tagline,
    url: partner.affiliateUrl,
    ...(logoUrl && { logo: logoUrl }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton
          href="/partners"
          text="Terug naar partners"
          className="inline-flex items-center gap-2 font-bold bg-gradient-to-r from-orange to-orange/90 text-darkBlue py-3 px-6 rounded-xl shadow-lg hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 hover:scale-105 transform"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Banner */}
        {heroBannerUrl && (
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl mb-8 aspect-[16/5]">
            <Image
              src={heroBannerUrl}
              alt={`${partner.name} banner`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                {partner.name}
              </h1>
              {partner.tagline && (
                <p className="text-orange text-lg font-semibold drop-shadow">{partner.tagline}</p>
              )}
            </div>
          </div>
        )}

        {/* Title when no hero banner */}
        {!heroBannerUrl && (
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{partner.name}</h1>
            {partner.tagline && (
              <p className="text-orange text-xl font-semibold">{partner.tagline}</p>
            )}
          </div>
        )}

        {/* Partner intro row: logo + CTA */}
        <div className="anim-fade-up bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 lg:p-10 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {logoUrl && (
              <div className="flex-shrink-0 bg-white rounded-xl p-5 shadow-xl">
                <Image
                  src={logoUrl}
                  alt={`${partner.name} logo`}
                  width={160}
                  height={70}
                  className="object-contain max-h-[70px] w-auto"
                />
              </div>
            )}
            <div className="flex-1 text-center lg:text-left">
              {!heroBannerUrl && (
                <h2 className="text-2xl font-extrabold text-white mb-1">{partner.name}</h2>
              )}
              <p className="text-gray-300 leading-relaxed text-base">
                {partner.tagline || `Bezoek ${partner.name} via onze partner link en profiteer van exclusieve voordelen.`}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href={partner.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-3 bg-orange text-darkBlue font-extrabold py-4 px-10 rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 transform text-lg whitespace-nowrap"
              >
                {partner.ctaText || "Bezoek de shop"}
                <FaExternalLinkAlt className="text-sm opacity-70" />
              </Link>
            </div>
          </div>
        </div>

        {/* USP section */}
        {usps.length > 0 && (
          <div className="anim-stagger grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {usps.map((usp, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-orange">
                <div className="w-11 h-11 bg-orange/10 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-orange text-xl" />
                </div>
                <p className="text-gray-700 font-semibold leading-snug">{usp}</p>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {partner.description && (
          <div className="anim-fade-up bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Over {partner.name}</h2>
            <div
              className="text-gray-700 leading-relaxed dynamic_text_input prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: partner.description }}
            />
          </div>
        )}

        {/* Promo code */}
        {partner.promoCode && (
          <div className="anim-fade-up bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 lg:p-10 mb-8 flex flex-col items-center text-center gap-5">
            <div className="flex items-center gap-2">
              <FaTag className="text-orange" />
              <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                {partner.promoCodeLabel || "Jouw exclusieve kortingscode"}
              </h2>
            </div>
            <CopyPartnerPromoCode promoCode={partner.promoCode} />
            <p className="text-gray-400 text-xs">
              Voer deze code in bij het afrekenen op{" "}
              <a
                href={partner.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-orange hover:text-yellow-400 font-semibold"
              >
                {partner.name}
              </a>
            </p>
          </div>
        )}

        {/* Gallery */}
        {galleryUrls.length > 0 && (
          <div className="anim-fade-up bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Bekijk het aanbod
            </h2>
            <Slider imagePaths={galleryUrls} />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="anim-fade-up bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight">
                {partner.name} — aanbevolen door Hondenkunde.nl
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {partner.tagline
                  ? `${partner.tagline}. Bezoek ${partner.name} via onze partner link en profiteer van de beste deals voor jouw hond.`
                  : `Bezoek ${partner.name} via onze partner link en profiteer van de beste deals voor jouw hond.`}
              </p>
              {partner.promoCode && (
                <p className="text-orange font-semibold mt-3 text-sm">
                  Vergeet niet kortingscode <span className="font-extrabold">{partner.promoCode}</span> te gebruiken bij het afrekenen.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
              <Link
                href={partner.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-3 bg-orange text-darkBlue font-extrabold py-4 px-10 rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105 transform text-lg whitespace-nowrap"
              >
                {partner.ctaText || "Bezoek de shop"}
                <FaExternalLinkAlt className="text-sm opacity-70" />
              </Link>
              {partner.secondaryUrl && partner.secondaryCtaText && (
                <Link
                  href={partner.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-3 border-2 border-white/20 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg whitespace-nowrap"
                >
                  {partner.secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnerDetail;
