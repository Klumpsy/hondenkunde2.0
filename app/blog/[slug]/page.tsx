"use server";

import { getBlogs, getSingleBlog } from "@/app/pocketbase/pocketbase";
import Image from "next/image";
import { getFileUrl } from "@/app/pocketbase/pocketbase";
import MediaWithText from "@/app/components/blogItem/MediaWithText";
import Disclaimer from "@/app/components/blogItem/Disclaimer";
import ShareOnSocials from "@/app/components/blogItem/ShareOnSocials";
import { notFound } from "next/navigation";
import PromoCodeHondenShop from "@/app/components/promo/PromoCodeHondenShop";
import BackButton from "@/app/components/backButton/BackButton";
import HondenShopBanner from "@/app/components/hondenShopBanner/HondenShopBanner";

interface BlogParams {
  slug: string;
  id: string;
}

interface BlogDetailProps {
  params: Promise<BlogParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogParams>;
}) {
  const resolvedParams = await params;
  const blog = await getSingleBlog(resolvedParams.slug);

  if (!blog) notFound();

  return {
    title: `${blog.title} | Hondenkunde`,
    description: blog.metaDataDescription,
  };
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const resolvedParams = await params;
  const blog = await getSingleBlog(resolvedParams.slug);

  if (!blog) notFound();

  const introImageUrl = await getFileUrl(blog, "introImage");
  const imageBlockOne = await getFileUrl(blog, "imageBlockOne");
  const imageBlockTwo = await getFileUrl(blog, "imageBlockTwo");
  const imageBlockThree = await getFileUrl(blog, "imageBlockThree");

  return (
    <div className="p-4 sm:p-8 bg-blue-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[1200px] mb-8 mt-4">
        <BackButton
          href="/blog"
          text="Terug naar overzicht"
          className="back_button_blog font-extrabold bg-orange text-darkBlue py-3 px-5 rounded-full shadow-md hover:bg-gray-800 hover:text-orange transition"
        />
      </div>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-[1200px]">
        <h1 className="text-center mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          {blog.title}
        </h1>
        <div className="my-8">
          <div className="relative max-w-[1100px] mx-auto overflow-hidden rounded-lg shadow-lg">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              {" "}
              <Image
                src={introImageUrl}
                alt="blog post image"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
                className="absolute top-0 left-0 w-full h-full object-cover"
                priority={true}
              />
            </div>
          </div>
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
          className="p-1 mt-8 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.introText }}
        ></div>
        <div className="blog_content_container">
          <MediaWithText
            mediaSrc={blog.videoBlockOne ? blog.videoBlockOne : imageBlockOne}
            mediaAlt="blog post media"
            text={blog.textBlockOne || ""}
            orientation="right"
            title={blog.subTitleOne}
            isVideo={!!blog.videoBlockOne}
          />

          {blog.showBanner && <HondenShopBanner />}

          <MediaWithText
            mediaSrc={blog.videoBlockTwo ? blog.videoBlockTwo : imageBlockTwo}
            mediaAlt="blog post media"
            text={blog.textBlockTwo || ""}
            orientation="right"
            title={blog.subTitleTwo}
            isVideo={!!blog.videoBlockTwo}
          />
          <MediaWithText
            mediaSrc={
              blog.videoBlockThree ? blog.videoBlockThree : imageBlockThree
            }
            mediaAlt="blog post media"
            text={blog.textBlockThree || ""}
            orientation="right"
            title={blog.subTitleThree}
            isVideo={!!blog.videoBlockThree}
          />
        </div>
      </div>
      <Disclaimer />
      <div className="w-full max-w-[1200px] mb-4 mt-4">
        <PromoCodeHondenShop />
      </div>
    </div>
  );
};

export default BlogDetail;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  if (!blogs?.length) return [];
  return blogs.map((blog) => ({ slug: blog.slug }));
}
