import { getBlogs, getSingleBlog } from "@/app/pocketbase/pocketbase";
import Link from "next/link";
import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import MediaWithText from "@/app/components/blogItem/MediaWithText";
import Disclaimer from "@/app/components/blogItem/Disclaimer";
import ShareOnSocials from "@/app/components/blogItem/ShareOnSocials";

interface BlogParams {
  slug: string;
  id: string;
}

interface BlogDetailProps {
  params: BlogParams;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const blog = await getSingleBlog(params.slug);

  const introImageUrl = await getFileUrl(blog, "introImage");
  const imageBlockOne = await getFileUrl(blog, "imageBlockOne");
  const imageBlockTwo = await getFileUrl(blog, "imageBlockTwo");
  const imageBlockThree = await getFileUrl(blog, "imageBlockThree");

  return (
    <div className="p-4 sm:p-8 bg-blue-100">
      <div className="relative container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-[1200px]">
        <Link
          href="/blog"
          className="back_button_blog font-extrabold transform bg-orange text-darkBlue py-3 px-5 rounded-full shadow-md hover:bg-gray-800 hover:text-orange transition"
        >
          Terug naar overzicht
        </Link>
        <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {blog.title}
        </h1>
        <div className="flex justify-center items-center w-full max-w-full max-h-[400px] overflow-hidden">
          <Image
            src={introImageUrl}
            alt="blog post image"
            width={1000}
            height={600}
            className="mb-4 object-cover w-full md:w-auto" // Ensure full width on mobile, auto width on larger screens
          />
        </div>
        <div className="flex flex-wrap justify-center items-center mt-4 border-t-2 pt-5">
          {blog.tags &&
            blog.tags.map((tag: string) => (
              <p
                key={tag + blog.id}
                className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase m-2 inline-block ${tag}`}
              >
                {tag}
              </p>
            ))}
        </div>
        <div>
          <ShareOnSocials title={blog.title} />
        </div>
        <div
          className=" p-4 mt-8 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.introText }}
        ></div>
        <div className="blog_content_container">
          <MediaWithText
            mediaSrc={blog.videoBlockOne ? blog.videoBlockOne : imageBlockOne}
            mediaAlt="blog post media"
            text={blog.textBlockOne || ""}
            orientation="left"
            title={blog.subTitleOne}
            isVideo={blog.videoBlockOne}
          />
          <MediaWithText
            mediaSrc={blog.videoBlockTwo ? blog.videoBlockTwo : imageBlockTwo}
            mediaAlt="blog post media"
            text={blog.textBlockTwo || ""}
            orientation="right"
            title={blog.subTitleTwo}
            isVideo={blog.videoBlockTwo}
          />
          <MediaWithText
            mediaSrc={
              blog.videoBlockThree ? blog.videoBlockThree : imageBlockThree
            }
            mediaAlt="blog post media"
            text={blog.textBlockThree || ""}
            orientation="left"
            title={blog.subTitleThree}
            isVideo={blog.videoBlockThree}
          />
        </div>
      </div>
      <Disclaimer />
    </div>
  );
};

export default BlogDetail;

export async function generateStaticParams() {
  const blogs = await getBlogs();

  const paths = blogs.map((blog) => ({
    slug: blog.slug,
  }));

  return {
    paths,
    fallback: true,
  };
}
