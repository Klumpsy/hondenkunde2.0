import SearchBar from "../components/filter/SearchBar";
import Header from "../components/header/Header";
import RatingCard from "../components/ratingCard/RatingCard";
import { getRatingItems } from "../pocketbase/pocketbase";

const ArtiRating = async ({
  searchParams,
}: {
  searchParams: { search?: string; tags?: string };
}) => {
  const search = searchParams?.search || "";
  const ratingItems = await getRatingItems(search);

  return (
    <div>
      <Header
        imageName="banner12.jpg"
        linkHref="https://www.hondenshop.nl/partner/hondenkunde/"
        titleText="Arti's Rating"
        anchorText="Bekijk Arti's favoriete shop"
      />
      <div className="relative flex w-full justify-center space-x-5">
        <SearchBar
          baseRoute="/artiRating"
          placeholder="Zoek in Arti's rating..."
        />
      </div>

      <div
        id="search-results"
        className="p-5 container mx-auto max-w-screen-xl grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:max-w-7xl"
      >
        {ratingItems?.map((ratingItem, index) => {
          return <RatingCard key={index} ratingItem={ratingItem} />;
        })}
      </div>
    </div>
  );
};

export default ArtiRating;
