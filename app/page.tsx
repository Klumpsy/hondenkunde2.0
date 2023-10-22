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
            Hondenkunde.nl belichaamt een samensmelting van passie en praktische
            ervaring, gebracht naar u door twee toegewijde hondeneigenaren.
            Hoewel onze liefde voor honden diep geworteld is, zijn we geen
            experts, maar delen we wel oprechte en uitgeteste inzichten over het
            eigenaarschap van huisdieren. Hier vindt u eerlijke beoordelingen
            van producten die we zelf hebben gebruikt en getest, naast artikelen
            die onze persoonlijke ervaringen en avonturen met onze honden
            weerspiegelen. Bij Hondenkunde.nl streven we ernaar een authentieke
            en betrouwbare bron te zijn voor gelijkgestemde hondenliefhebbers
            die op zoek zijn naar real-world adviezen en verhalen uit de eerste
            hand. Uw reis door het hondenouderschap, verrijkt door gedeelde
            kennis en gemeenschap, begint hier.
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
