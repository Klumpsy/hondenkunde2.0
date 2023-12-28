"use client";

import Image from "next/image";
import React, { useState } from "react";

interface SliderProps {
  imagePaths: string[];
}

const Slider: React.FC<SliderProps> = ({ imagePaths }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length
    );
  };

  return (
    <div
      id="default-carousel"
      className=" mt-4 relative mx-auto max-w-screen-xl w-full sm:w-[600px] md:w-full"
      data-carousel="slide"
      style={{ maxWidth: "1000px" }}
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {imagePaths?.map((src, index) => (
          <div
            key={src}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            data-carousel-item
          >
            <Image
              src={src}
              alt={`slide-${index}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              className="absolute w-full h-auto transform"
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {imagePaths.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full border border-white bg-white ${
              currentIndex === index ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
      <button
        onClick={prevSlide}
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-white-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-white-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        onClick={nextSlide}
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-white-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-white-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-white-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
