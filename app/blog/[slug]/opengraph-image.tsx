import { getSingleBlog, getFileUrl } from "@/app/pocketbase/pocketbase";
import { estimateReadingTime } from "@/app/helpers/textHelper";
import { formatDate } from "@/app/helpers/dateHelper";
import { ImageResponse } from "next/server";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Hondenkunde | Blog";
export const contentType = "image/png";

export default async function og({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const blogItem = await getSingleBlog(slug);
  const imageUrl = await getFileUrl(blogItem, "introImage");

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={imageUrl + "&w=1200&h=630&auto=format&q=75"}
            alt={blogItem?.title!!}
          />
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          <div tw="text-7xl font-bold">{blogItem?.title}</div>
          <div tw="flex mt-6 flex-wrap items-center text-4xl text-neutral-200">
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div>
              {estimateReadingTime(
                blogItem?.introText +
                  blogItem?.textBlockOne +
                  blogItem?.textBlockTwo +
                  blogItem?.textBlockThree
              )}{" "}
              min
            </div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div> {formatDate(blogItem.created)}</div>
          </div>
        </div>
      </div>
    )
  );
}
