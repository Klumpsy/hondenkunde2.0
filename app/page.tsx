import { Metadata } from "next";
import Header from "./components/header/Header";

export const metadata: Metadata = {
  title: "Hondenkunde.nl — het beste voor jouw hond",
  description: "Ontdek blogs, producttests en reistips voor hondenliefhebbers op Hondenkunde.nl. Door Friese Stabij Arti getest en persoonlijk aanbevolen.",
  openGraph: {
    title: "Hondenkunde.nl — het beste voor jouw hond",
    description: "Ontdek blogs, producttests en reistips voor hondenliefhebbers op Hondenkunde.nl. Door Friese Stabij Arti getest en persoonlijk aanbevolen.",
    url: "/",
  },
};
import { getFeaturedBlog, getFeaturedItem, getFeaturedPartners, getPartnerFileUrl } from "./pocketbase/pocketbase";
import FeaturedBlog from "./components/featured/FeaturedBlog";
import FeaturedRating from "./components/featured/FeaturedRating";
import PromoCode from "./components/promo/PromoCodeHondenShop";
import { FaDog, FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [featuredBlog, featuredRating, featuredPartners] = await Promise.all([
    getFeaturedBlog(),
    getFeaturedItem(),
    getFeaturedPartners(),
  ]);

  const partnersWithLogos = await Promise.all(
    featuredPartners.map(async (partner) => ({
      ...partner,
      logoUrl: partner.logo ? await getPartnerFileUrl(partner, "logo") : null,
    }))
  );

  return (
    <>
      <Header
        imageName="banner11.jpg"
        linkHref="/blog"
        titleText="Welkom op Hondenkunde.nl"
        anchorText="Bekijk nieuwste blog"
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12">
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none select-none absolute -right-32 top-[24%] w-[900px] h-[900px] text-orange opacity-[0.05] -rotate-12 hidden md:block"
          fill="currentColor"
        >
          <ellipse cx="20" cy="34" rx="8.5" ry="13" transform="rotate(-18 20 34)" />
          <ellipse cx="40" cy="20" rx="9" ry="14" transform="rotate(-6 40 20)" />
          <ellipse cx="60" cy="20" rx="9" ry="14" transform="rotate(6 60 20)" />
          <ellipse cx="80" cy="34" rx="8.5" ry="13" transform="rotate(18 80 34)" />
          <path d="M50 48 C30 48, 18 64, 22 80 C26 93, 38 96, 50 96 C62 96, 74 93, 78 80 C82 64, 70 48, 50 48 Z" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none select-none absolute -left-40 bottom-[8%] w-[760px] h-[760px] text-orange opacity-[0.04] rotate-[18deg] hidden lg:block"
          fill="currentColor"
        >
          <ellipse cx="20" cy="34" rx="8.5" ry="13" transform="rotate(-18 20 34)" />
          <ellipse cx="40" cy="20" rx="9" ry="14" transform="rotate(-6 40 20)" />
          <ellipse cx="60" cy="20" rx="9" ry="14" transform="rotate(6 60 20)" />
          <ellipse cx="80" cy="34" rx="8.5" ry="13" transform="rotate(18 80 34)" />
          <path d="M50 48 C30 48, 18 64, 22 80 C26 93, 38 96, 50 96 C62 96, 74 93, 78 80 C82 64, 70 48, 50 48 Z" />
        </svg>
        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 anim-stagger">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange to-orange/80 rounded-full mb-6 mx-auto">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-bold text-orange text-center mb-2">∞</h3>
              <p className="text-gray-600 text-center font-medium">Enthousiasme van honden</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange to-orange/80 rounded-full mb-6 mx-auto">
                <FaStar className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-bold text-orange text-center mb-2">50+</h3>
              <p className="text-gray-600 text-center font-medium">Geteste producten</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange to-orange/80 rounded-full mb-6 mx-auto">
                <FaDog className="text-3xl text-white" />
              </div>
              <h3 className="text-4xl font-bold text-orange text-center mb-2">#1</h3>
              <p className="text-gray-600 text-center font-medium">Het beste voor jouw hond</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-16 anim-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1.5 h-16 bg-orange rounded-full flex-shrink-0"></div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      Over Hondenkunde.nl
                    </h2>
                    <p className="text-orange font-semibold">Jouw bron voor hondeninformatie</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-base lg:text-lg">
                    Zoals de naam al doet vermoeden vind je op Hondenkunde.nl info
                    over van alles omtrent honden. We schrijven regelmatig nieuwe
                    blogs met handige tips die we hebben opgedaan op de hondenschool
                    en diverse websites.
                  </p>

                  <p className="text-base lg:text-lg">
                    En natuurlijk op basis van wat wij hebben ervaren bij onze
                    Friese stabij Arti. Naast blogs vind je ook beoordeelde
                    producten. Deze hondenartikelen zijn getest door Arti en
                    voorzien van haar ongezouten mening.
                  </p>

                  <div className="pt-4">
                    <p className="text-xl font-bold text-orange">
                      Veel leesplezier gewenst! 🐾
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative h-full min-h-[400px]">
                <Image
                  src="/images/arti1.webp"
                  alt="Arti - Friese Stabij"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/30"></div>
                <div className="absolute bottom-8 right-8 bg-orange/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
                  <p className="text-white text-xl font-bold">Arti</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 anim-stagger">
            <div className="w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange to-orange/50 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Uitgelichte Blog</h2>
                  <p className="text-gray-600 text-sm mt-1">Ontdek onze nieuwste inzichten</p>
                </div>
              </div>
              {featuredBlog && <FeaturedBlog blogItem={featuredBlog} />}
            </div>

            <div className="flex items-center justify-center gap-3 my-12" aria-hidden>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
              <div className="w-2 h-2 rounded-full bg-orange/60" />
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
            </div>

            <div className="w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange to-orange/50 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Uitgelichte Rating</h2>
                  <p className="text-gray-600 text-sm mt-1">Door Arti getest en goedgekeurd</p>
                </div>
              </div>
              <FeaturedRating ratingItem={featuredRating} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 my-16" aria-hidden>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
            <div className="w-2 h-2 rounded-full bg-orange/60" />
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
          </div>

          <div className="my-16 anim-fade-up">
            <PromoCode />
          </div>

          {/* Category explorer */}
          <div className="my-20 anim-fade-up">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Wat zoek je?
              </h2>
              <p className="text-gray-600 text-sm mt-3 max-w-md mx-auto">
                Van blogs tot reistips, alles op één plek.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 anim-stagger">
              {[
                { name: "Blog", desc: "Tips & ervaringen", href: "/blog", img: "/images/banner6.jpeg" },
                { name: "Ratings", desc: "Producttests door Arti", href: "/artiRating", img: "/images/banner12.jpg" },
                { name: "Vakantie", desc: "Reizen met hond", href: "/vakantie-met-hond", img: "/images/banner_13.jpeg" },
                { name: "Promo’s", desc: "Exclusieve kortingen", href: "/artiActie", img: "/images/banner_3.jpg" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 aspect-[4/5] flex flex-col justify-end shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/10" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-orange/0 group-hover:bg-orange transition-all duration-300 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                    &#8594;
                  </div>
                  <div className="relative z-10 p-5">
                    <div className="text-xl font-bold text-white mb-1 drop-shadow-md">{cat.name}</div>
                    <div className="text-sm text-orange font-semibold drop-shadow-md">{cat.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {partnersWithLogos.length > 0 && (
            <>
              <div className="flex items-center justify-center gap-3 my-12" aria-hidden>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
                <div className="w-2 h-2 rounded-full bg-orange/60" />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-[180px]" />
              </div>
              <div className="anim-fade-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-12 bg-gradient-to-b from-orange to-orange/50 rounded-full"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Onze Partners</h2>
                    <p className="text-gray-600 text-sm mt-1">Door Arti aanbevolen shops en merken</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {partnersWithLogos.map((partner) => (
                    <Link
                      key={partner.id}
                      href={`/partners/${partner.slug}`}
                      className="group flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 min-w-[140px] border border-gray-100 hover:border-orange/30"
                    >
                      {partner.logoUrl ? (
                        <Image
                          src={partner.logoUrl}
                          alt={`${partner.name} logo`}
                          width={100}
                          height={50}
                          className="object-contain max-h-[50px] w-auto mb-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-700 mb-3 group-hover:text-orange transition-colors">{partner.name}</span>
                      )}
                      <span className="text-xs text-gray-500 group-hover:text-orange transition-colors font-medium">{partner.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/partners"
                    className="flex flex-col items-center justify-center bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl border border-orange/20 hover:border-orange/50 transition-all duration-300 hover:-translate-y-1 p-5 min-w-[140px] hover:shadow-lg"
                  >
                    <span className="text-orange font-bold text-sm">Alle partners</span>
                    <span className="text-orange/60 text-xs mt-1">→ bekijk overzicht</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}