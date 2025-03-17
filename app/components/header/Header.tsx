"use client";

import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  imageName: string;
  linkHref: string;
  titleText: string;
  anchorText: string;
};

const Header = ({
  imageName,
  linkHref,
  titleText,
  anchorText,
}: HeaderProps) => (
  <header>
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{ height: "30rem" }}
    >
      <div className="absolute w-full h-full">
        <Image
          src={`/images/${imageName}`}
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="z-0"
        />
      </div>
      <div className="z-10 bg-gray-500 bg-opacity-75 absolute w-full h-full" />
      <div className="z-20 text-center">
        <h1 className="mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
          {titleText}
        </h1>
        <Link
          href={linkHref}
          className="inline-block mt-7 px-4 py-2 bg-orange text-white text-sm uppercase font-medium rounded hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-orange hover:text-orange"
          style={{ maxWidth: "250px" }}
          target={linkHref.startsWith("/") ? "_self" : "_blank"}
          rel={linkHref.startsWith("/") ? "" : "noopener noreferrer"}
        >
          {anchorText}
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
