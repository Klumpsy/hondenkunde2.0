import BlogItem from "../__components/blogItem/BlogItem";
import { getBlogs } from "../pocketbase/pocketbase";
import Header from "../__components/header/Header";
import CustomFilter from "../filters/CustomFilter";
import { tags } from "../constants/constants";

const Blog = async () => {
  const blogs = await getBlogs();

  return (
    <div>
      <Header
        imageName="banner11.jpg"
        linkHref="/artiRating"
        titleText="Blog"
        anchorText="Bekijk Arti's rating"
      />
      <section className="paw-pattern max-w-[1200px] mx-auto"></section>
      <section className="max-w-[1200px] m-5 mb-3 mx-auto">
        <CustomFilter title="Tags" options={tags} />
      </section>
      <section className="paw-pattern max-w-[1200px] mx-auto"></section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto p-3">
        {blogs?.map((blogItem) => {
          return (
            <BlogItem
              key={blogItem.id}
              blogItem={blogItem}
              className="col-span-1 md:col-span-1 lg:col-span-1"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
