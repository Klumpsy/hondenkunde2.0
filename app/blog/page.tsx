import BlogItem from "../components/blogItem/BlogItem";

import { getBlogs } from "../pocketbase/pocketbase";
import SearchBar from "../components/filter/SearchBar";
import Filter from "../components/filter/Filters";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
      {
        blogs?.map((blogItem, index) => {
          if(index === 0) {
            return <BlogItem key={blogItem.id} blogItem={blogItem} className="col-span-1 md:col-span-2 lg:col-span-3"/>
          } else if(index >= 1 && index <= 2) {
            return <BlogItem key={blogItem.id} blogItem={blogItem} className="col-span-1 md:col-span-1 lg:col-span-1"/>
          } else {
            return <BlogItem key={blogItem.id} blogItem={blogItem} className="col-span-1"/>
          }
        })
      }
    </div>
  </div>
  ); 
};

export default Blog;