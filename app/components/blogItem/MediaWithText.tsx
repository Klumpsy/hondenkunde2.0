import React from "react";
import Image from "next/image";

interface MediaWithTextProps {
  mediaSrc: string;
  mediaAlt: string;
  text: string;
  orientation: string;
  title: string;
  isVideo?: boolean;
}

const MediaWithText: React.FC<MediaWithTextProps> = ({
  mediaSrc,
  mediaAlt,
  text,
  orientation,
  title,
  isVideo,
}) => {
  function extractVideoID(url) {
    const videoIDRegex =
      /(?:www\.youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(videoIDRegex);
    return matches ? matches[1] : null;
  }

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div
        className={`xl:flex ${
          orientation === "right" ? "xl:flex-row-reverse" : ""
        } items-center space-y-4 xl:space-y-0 xl:space-x-4`}
      >
        {mediaSrc && (
          <div className="m-4 md:float-left md:w-1/3 lg:w-1/4 xl:float-none xl:flex-shrink-0 xl:w-auto">
            {isVideo ? (
              <div className="responsive-video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoID(
                    mediaSrc
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full"
              />
            )}
          </div>
        )}
        <div className="space-y-2">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </section>
  );
};

export default MediaWithText;
