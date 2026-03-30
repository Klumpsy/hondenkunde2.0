import Image from "next/image";
import Link from "next/link";
import { Partner } from "@/app/definitions/interface/PartnerInterface";
import { getPartnerFileUrl } from "@/app/pocketbase/pocketbase";

interface PartnerBannerProps {
  partner: Partner;
}

const PartnerBanner = async ({ partner }: PartnerBannerProps) => {
  const bannerUrl = partner.embeddedBannerImage
    ? await getPartnerFileUrl(partner, "embeddedBannerImage")
    : null;

  if (!bannerUrl) return null;

  return (
    <div className="my-8">
      <Link
        href={`/partners/${partner.slug}`}
        className="block w-full"
      >
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg group">
          <Image
            src={bannerUrl}
            alt={`${partner.name} - ${partner.tagline || "Partner banner"}`}
            width={1200}
            height={280}
            className="w-full h-auto"
            priority
          />
          <div className="absolute inset-0 bg-gray-500/20 group-hover:bg-gray-500/10 transition-colors duration-300" />
          {partner.tagline && (
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-orange/90 text-darkBlue text-sm font-bold px-3 py-1.5 rounded-lg">
                {partner.name} — {partner.tagline}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PartnerBanner;
