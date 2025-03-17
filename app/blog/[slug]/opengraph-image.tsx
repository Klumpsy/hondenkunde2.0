import { getSingleBlog, getFileUrl } from "@/app/pocketbase/pocketbase";
import { estimateReadingTime } from "@/app/helpers/textHelper";
import { formatDate } from "@/app/helpers/dateHelper";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Hondenkunde | Blog";

export default async function og({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const blogItem = await getSingleBlog(slug);
  const imageUrl = await getFileUrl(blogItem, "introImage");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            inset: 0,
          }}
        >
          <img
            style={{
              flex: 1,
            }}
            src={imageUrl + "&w=1200&h=630&auto=format&q=75"}
            alt={blogItem?.title || ""}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              opacity: 0.5,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "rgb(250, 250, 250)",
          }}
        >
          <div
            style={{
              fontSize: "70px",
              fontWeight: "bold",
            }}
          >
            {blogItem?.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              flexWrap: "wrap",
              alignItems: "center",
              fontSize: "36px",
              color: "rgb(229, 229, 229)",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                margin: "0 24px",
                borderRadius: "9999px",
                backgroundColor: "rgb(209, 213, 219)",
              }}
            />
            <div
              style={{
                width: "16px",
                height: "16px",
                margin: "0 24px",
                borderRadius: "9999px",
                backgroundColor: "rgb(209, 213, 219)",
              }}
            />
            <div>
              {estimateReadingTime(
                (blogItem?.introText || "") +
                  (blogItem?.textBlockOne || "") +
                  (blogItem?.textBlockTwo || "") +
                  (blogItem?.textBlockThree || "")
              )}{" "}
              min
            </div>
            <div
              style={{
                width: "16px",
                height: "16px",
                margin: "0 24px",
                borderRadius: "9999px",
                backgroundColor: "rgb(209, 213, 219)",
              }}
            />
            <div>{formatDate(blogItem.created)}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    }
  );
}
