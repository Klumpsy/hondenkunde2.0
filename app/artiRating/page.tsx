import Header from "../components/header/Header";
import RatingCard from "../components/ratingCard/RatingCard";
import { getRatingItems } from "../pocketbase/pocketbase";

export default async function ArtiRating() {

  const ratingItems = await getRatingItems();

  console.log(ratingItems);

  return (
    <>
      <Header imageName="banner12.jpg" linkHref="/blog" titleText="Arti's Rating" anchorText="Bekijk Arti's favoriete shop" />
      <div className="p-5 container mx-auto max-w-screen-xl grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
      {
        ratingItems?.map((ratingItem, index) => {
            return <RatingCard key={index} ratingItem={ratingItem}/>
        })
      }
      </div>
    </>
  );
}
