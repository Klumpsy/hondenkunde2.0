import BlogItem from "../components/blogItem/BlogItem";
import { getBlogs } from "../pocketbase/pocketbase";
import Header from "../components/header/Header";
import SearchBar from "../components/filter/SearchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Hondenkunde.nl",
  description:
    "Lees meer over onze ervaringen als hondeneigenaren en die van onze hond Arti",
};

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tags?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const tagsParam = resolvedSearchParams?.tags || "";
  const selectedTags = tagsParam ? tagsParam.split(",") : [];

  const blogs = await getBlogs(search, selectedTags);

  return (
    <div>
      <Header
        imageName="banner6.jpeg"
        linkHref="/artiRating"
        titleText="Blog"
        anchorText="Bekijk Arti's rating"
      />
      <section className="paw-pattern max-w-[1200px] mx-auto"></section>
      <div className="relative flex w-full justify-center space-x-5">
        <SearchBar baseRoute="/blog" placeholder="Zoek in blogs..." />
      </div>
      <div
        id="search-results"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto p-3"
      >
        {blogs?.map((blogItem) => (
          <BlogItem
            key={blogItem.id}
            blogItem={blogItem}
            className="col-span-1 md:col-span-1 lg:col-span-1"
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
