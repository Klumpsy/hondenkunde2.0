import { Suspense } from "react";
import FilterBar from "../components/filter/FilterBar";
import Header from "../components/header/Header";
import Pagination from "../components/filter/Pagination";
import RatingCard from "../components/ratingCard/RatingCard";
import { getRatingItems, getRatingTags } from "../pocketbase/pocketbase";
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
  searchParams: Promise<{ search?: string; tags?: string; page?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const tagsParam = resolvedSearchParams?.tags || "";
  const selectedTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  const page = parseInt(resolvedSearchParams?.page || "1", 10);

  const [ratingItems, availableTags]: [PaginatedRatingItems, string[]] =
    await Promise.all([
      getRatingItems(search, selectedTags, page, 6),
      getRatingTags(),
    ]);

  return (
    <div>
      <Header
        imageName="banner12.jpg"
        linkHref="https://www.hondenshop.nl/partner/hondenkunde/"
        titleText="Arti's Rating"
        anchorText="Bekijk Arti's favoriete shop"
      />

      <FilterBar
        baseRoute="/artiRating"
        placeholder="Zoek in Arti's rating..."
        availableTags={availableTags}
      />

      <Suspense fallback={<div>Loading....</div>}>
        <div
          id="search-results"
          className="p-5 container mx-auto max-w-screen-xl grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:max-w-7xl anim-stagger"
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
