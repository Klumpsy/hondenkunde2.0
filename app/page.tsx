import Header from "./components/header/Header";
import { getFeaturedBlog, getFeaturedItem } from "./pocketbase/pocketbase";
import FeaturedBlog from "./components/featured/FeaturedBlog";
import FeaturedRating from "./components/featured/FeaturedRating";

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
      <div className="container mx-auto px-4">
        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Over Hondenkunde.nl</h2>
          <p className="text-lg text-left">
            Zoals de naam al doet vermoeden vind je op Hondenkunde.nl info over
            van alles omtrent honden. We schrijven regelmatig nieuwe blogs met
            handige tips die we hebben opgedaan op de hondenschool en diverse
            websites. En natuurlijk op basis van wat wij hebben ervaren bij onze
            Friese stabij Arti. Naast blogs vind je ook beoordeelde producten.
            Deze hondenartikelen zijn getest door Arti en voorzien van haar
            ongezouten mening. Uiteraard zal dit voor iedere hond anders zijn
            😉. Veel leesplezier gewenst!
          </p>
        </section>
        <section className="paw-pattern max-w-[1200px] mx-auto"></section>
        <section className="flex items-center justify-center mb-5">
          <div className="mx-auto my-0 flex flex-wrap justify-between items-center relative max-w-[1000px]">
            <div className="w-full md:w-1/2 p-4 relative flex flex-col items-center justify-center">
              <h3 className="mt-4 mb-4 text-2xl font-bold z-10 relative text-orange">
                Blog Uitgelicht:
              </h3>
              <FeaturedBlog blogItem={featuredBlog} />
            </div>
            <div className="w-full md:w-1/2 p-4 relative flex flex-col items-center justify-center">
              <h3 className="mt-4 mb-4 text-2xl font-bold z-10 relative text-orange">
                Rating Uitgelicht:
              </h3>
              <FeaturedRating ratingItem={featuredRating} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
