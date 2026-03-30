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
      const tl = gsap.timeline({ delay: 0.45 });
      tl.fromTo(
        ".header-title",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }
      ).fromTo(
        ".header-cta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" },
        "-=0.35"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className="-mt-20">
      <div className="relative w-full h-[30rem] lg:h-[38rem] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`/images/${imageName}`}
            alt={titleText}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 28%" }}
            quality={85}
            priority
            className="z-0"
          />
        </div>

        {/* Darkening layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/65 z-10" />

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
