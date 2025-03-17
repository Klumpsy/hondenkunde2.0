"use server";

import Header from "./components/header/Header";
import { getFeaturedBlog, getFeaturedItem } from "./pocketbase/pocketbase";
import FeaturedBlog from "./components/featured/FeaturedBlog";
import FeaturedRating from "./components/featured/FeaturedRating";
import PromoCode from "./components/promo/PromoCodeHondenShop";

export default async function Home() {
  const featuredBlog = await getFeaturedBlog();
  const featuredRating = await getFeaturedItem();

  return (
    <>
      <Header
        imageName="banner11.jpg"
        linkHref="/blog"
        titleText="Welkom op Hondenkunde.nl"
        anchorText="Bekijk nieuwste blog"
      />
      <div className="container mx-auto px-4 max-w-[1200px]">
        <section className="mt-16 text-left relative">
          {/* Decorative element */}
          <div className="absolute -left-4 md:left-0 top-0 h-20 w-1.5 bg-orange rounded-full hidden md:block"></div>

          <div className="md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Over Hondenkunde.nl
            </h2>

            <div className="mt-8 space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Zoals de naam al doet vermoeden vind je op Hondenkunde.nl info
                over van alles omtrent honden. We schrijven regelmatig nieuwe
                blogs met handige tips die we hebben opgedaan op de hondenschool
                en diverse websites.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                En natuurlijk op basis van wat wij hebben ervaren bij onze
                Friese stabij Arti. Naast blogs vind je ook beoordeelde
                producten. Deze hondenartikelen zijn getest door Arti en
                voorzien van haar ongezouten mening. Uiteraard zal dit voor
                iedere hond anders zijn.
              </p>

              <p className="text-lg font-medium text-orange">
                Veel leesplezier gewenst!
              </p>
            </div>
          </div>
        </section>

        <section className="paw-pattern max-w-[1200px] mx-auto my-4"></section>
        <section className="space-y-16 my-16">
          {/* Featured Blog */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-8 bg-orange"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Uitgelichte Blog
              </h2>
            </div>
            <FeaturedBlog blogItem={featuredBlog} />
          </div>

          {/* Featured Rating */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-8 bg-orange"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Uitgelichte Rating
              </h2>
            </div>
            <FeaturedRating ratingItem={featuredRating} />
          </div>
        </section>

        {/* Paw Pattern Divider */}
        <section className="paw-pattern max-w-[1200px] mx-auto my-12"></section>

        {/* Promo Section */}
        <section className="my-16">
          <PromoCode />
        </section>
      </div>
    </>
  );
}
