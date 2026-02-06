"use server";

import Header from "./components/header/Header";
import { getFeaturedBlog, getFeaturedItem } from "./pocketbase/pocketbase";
import FeaturedBlog from "./components/featured/FeaturedBlog";
import FeaturedRating from "./components/featured/FeaturedRating";
import PromoCode from "./components/promo/PromoCodeHondenShop";
import { FaDog, FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";

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

      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-16">
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

          <div className="space-y-12">
            <div className="w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange to-orange/50 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Uitgelichte Blog</h2>
                  <p className="text-gray-600 text-sm mt-1">Ontdek onze nieuwste inzichten</p>
                </div>
              </div>
              <FeaturedBlog blogItem={featuredBlog} />
            </div>

            <div className="paw-pattern max-w-[1200px] mx-auto my-12"></div>

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

          <div className="paw-pattern max-w-[1200px] mx-auto my-16"></div>

          <div className="my-16">
            <PromoCode />
          </div>
        </div>
      </div>
    </>
  );
}