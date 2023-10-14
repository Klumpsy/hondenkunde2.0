import Header from "./components/header/Header";
import { getFeaturedBlog, getFeaturedItem } from "./pocketbase/pocketbase";
import RatingCard from "./components/ratingCard/RatingCard";
import BlogItem from "./components/blogItem/BlogItem";
import {AiOutlineStar} from 'react-icons/ai';

export default async function Home() {

  const featuredBlog = await getFeaturedBlog();
  const featuredRating = await getFeaturedItem();
  
  return (
    <>
      <Header imageName="banner11.jpg" linkHref="/blog" titleText="Welkom op Hondenkunde.nl" anchorText="Bekijk nieuwste blog" />
      <div className="container mx-auto px-4">
        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Over Hondenkunde.nl</h2>
          <p className="text-lg">
          Hondenkunde.nl belichaamt een samensmelting van passie en praktische ervaring, 
          gebracht naar u door twee toegewijde hondeneigenaren. Hoewel onze liefde voor honden diep geworteld is, 
          zijn we geen experts, maar delen we wel oprechte en 
          uitgeteste inzichten over het eigenaarschap van huisdieren.
          Hier vindt u eerlijke beoordelingen van producten die we zelf hebben gebruikt en getest,
          naast artikelen die onze persoonlijke ervaringen en avonturen met onze honden weerspiegelen. 
          Bij Hondenkunde.nl streven we ernaar een authentieke en betrouwbare bron te zijn 
          voor gelijkgestemde hondenliefhebbers die op zoek zijn naar real-world adviezen en 
          verhalen uit de eerste hand. Uw reis door het hondenouderschap, 
          verrijkt door gedeelde kennis en gemeenschap, begint hier.
          </p>
        </section>
        <section>
          <div className="flex flex-wrap justify-between relative">
            <div className="w-full md:w-1/2 p-4 relative">
              <AiOutlineStar size={180} className="text-yellow-400 absolute star_icon_left text-4xl opacity-50 z-0"/>
              <h3 className="mt-4 pl-3 text-2xl font-semibold z-10 relative">
                  Blog Uitgelicht: 
              </h3>
              <BlogItem blogItem={featuredBlog} className="m-0 z-10 relative"/>
            </div>
          <div className="w-full md:w-1/2 p-4 relative">
              <AiOutlineStar size={180} className="text-yellow-400 absolute star_icon_right text-4xl opacity-50 z-0"/>
              <h3 className="mt-4 mb-2 text-2xl font-semibold z-10 relative">
                  Rating Uitgelicht: 
              </h3>
              <RatingCard ratingItem={featuredRating}/>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
