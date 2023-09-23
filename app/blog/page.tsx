import React from "react";
import BlogItem from "../components/blogItem/BlogItem";
import { getBlogs } from "../pocketbase/pocketbase";

const Blog = async () => {
const blogs = await getBlogs();

  return (
    <div>
        <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Blog
        </h1>
        <div className="flex flex-wrap flex-row ">
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