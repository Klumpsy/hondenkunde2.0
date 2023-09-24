import BlogItem from "../components/blogItem/BlogItem";

import { getBlogs } from "../pocketbase/pocketbase";
import SearchBar from "../components/filter/SearchBar";
import Filter from "../components/filter/Filters";
import Image from "next/image";

const Blog = async ({
  searchParams
}: {
  searchParams: { [key:string]: string | string[] | undefined }
}) => {

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const tags = searchParams.tags ? (Array.isArray(searchParams.tags) ? searchParams.tags : [searchParams.tags]) : undefined;

  const blogs = await getBlogs({page, limit, search, tags});

  return (
    <div>
        <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Blog
        </h1>
        <SearchBar />
        <Filter />
        <div className="paw-pattern"> </div>
        <div className="flex flex-wrap flex-row max-w-[1200px] mx-auto">
            {
              blogs?.map((blogItem) => {
                return <BlogItem key={blogItem.id} blogItem={blogItem}/>
              })
            }
        </div>
    </div>
  ); 
};

export default Blog;