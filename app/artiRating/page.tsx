import { Suspense } from "react";
import SearchBar from "../components/filter/SearchBar";
import Header from "../components/header/Header";
import Pagination from "../components/filter/Pagination";
import RatingCard from "../components/ratingCard/RatingCard";
import { getRatingItems } from "../pocketbase/pocketbase";
import { PaginatedRatingItems } from "../components/filter/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arti's rating | Hondenkunde.nl",
  description:
    "Bekijk hier de ongezouten mening van onze hond Arti over verschillende producten",
};

const ArtiRating = async ({
  searchParams,
}: {
  searchParams: { search?: string; tags?: string; page?: string };
}) => {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1", 10);

  const ratingItems: PaginatedRatingItems = await getRatingItems(
    search,
    [],
    page,
    6
  );

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

      <Suspense fallback={<div>Loading...</div>}>
        <div
          id="search-results"
          className="p-5 container mx-auto max-w-screen-xl grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:max-w-7xl"
        >
          {ratingItems?.items.map((ratingItem, index) => (
            <RatingCard key={index} ratingItem={ratingItem} />
          ))}
        </div>

        <Pagination totalPages={ratingItems.totalPages} currentPage={page} />
      </Suspense>
    </div>
  );
};

export default ArtiRating;
