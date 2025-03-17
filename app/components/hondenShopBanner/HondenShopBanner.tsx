import Image from "next/image";
import Link from "next/link";

interface HondenShopBannerProps {
  imageUrl?: string;
  linkUrl?: string;
  altText?: string;
}

const HondenShopBanner = ({
  imageUrl = "/images/bannerblog.jpg",
  linkUrl = "https://www.hondenshop.nl/partner/hondenkunde/",
  altText = "Shop Banner",
}: HondenShopBannerProps) => {
  return (
    <div className="my-8">
      <Link
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={imageUrl}
            alt={altText}
            width={1200}
            height={280}
            className="w-full h-auto"
            priority
          />

          <div className="absolute inset-0 bg-gray-500/30 hover:bg-gray-500/20 transition-colors duration-300"></div>
        </div>
      </Link>
    </div>
  );
};

export default HondenShopBanner;
