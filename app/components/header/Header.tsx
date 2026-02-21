"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type HeaderProps = {
  imageName: string;
  linkHref: string;
  titleText: string;
  anchorText: string;
};

const Header = ({ imageName, linkHref, titleText, anchorText }: HeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".header-title",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", delay: 0.1, clearProps: "transform,opacity" }
      ).fromTo(
        ".header-cta",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header>
      <div className="relative w-full h-[30rem] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`/images/${imageName}`}
            alt="Background Image"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={100}
            priority
            className="z-0"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/70 to-gray-900/80 z-10" />

        <div ref={containerRef} className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="header-title mb-8 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-2xl">
            {titleText}
          </h1>
          <Link
            href={linkHref}
            className="header-cta inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange to-orange/90 text-darkBlue text-sm font-bold uppercase rounded-xl shadow-2xl hover:from-darkBlue hover:to-darkBlue/90 hover:text-orange transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-orange/50"
            target={linkHref.startsWith("/") ? "_self" : "_blank"}
            rel={linkHref.startsWith("/") ? "" : "noopener noreferrer"}
          >
            {anchorText}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
