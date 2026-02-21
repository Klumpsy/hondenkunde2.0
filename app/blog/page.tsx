import BlogItem from "../components/blogItem/BlogItem";
import { getBlogs, getBlogTags } from "../pocketbase/pocketbase";
import Header from "../components/header/Header";
import FilterBar from "../components/filter/FilterBar";
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

  const [blogs, availableTags] = await Promise.all([
    getBlogs(search, selectedTags),
    getBlogTags(),
  ]);

  return (
    <div>
      <Header
        imageName="banner6.jpeg"
        linkHref="/artiRating"
        titleText="Blog"
        anchorText="Bekijk Arti's rating"
      />
      <section className="paw-pattern max-w-[1200px] mx-auto"></section>
      <FilterBar
        baseRoute="/blog"
        placeholder="Zoek in blogs..."
        availableTags={availableTags}
      />
      <div
        id="search-results"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto p-3 anim-stagger"
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
