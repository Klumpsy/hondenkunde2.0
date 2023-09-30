import BlogItem from "../components/blogItem/BlogItem";

import { getBlogs } from "../pocketbase/pocketbase";
import SearchBar from "../components/filter/SearchBar";
import Filter from "../components/filter/Filters";
import Header from "../components/header/Header";

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
    <Header imageName="banner11.jpg" linkHref="/blog" titleText="Blog" anchorText="Bekijk Arti's rating" />
    <SearchBar />
    <Filter />
    <div className="paw-pattern"> </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto p-3">
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