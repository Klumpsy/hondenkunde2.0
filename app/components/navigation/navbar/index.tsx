"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useLayoutEffect } from "react";
import Logo from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type NavbarProps = {
  toggle: () => void;

  links: { name: string; href: string }[];
};

const Navbar: React.FC<NavbarProps> = ({ toggle, links }) => {
  const pathName = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Pages that have a full-bleed hero image behind the nav
  const hasHero =
    pathName === "/" ||
    pathName === "/blog" ||
    pathName === "/artiRating" ||
    pathName === "/partners" ||
    pathName === "/vakantie-met-hond" ||
    pathName === "/artiActie";

  const isDark = scrolled || !hasHero;

  // useLayoutEffect runs synchronously before the browser paints, so the
  // correct transparent/dark state is applied instantly on every navigation
  // without a single dark frame flickering through.
  useLayoutEffect(() => {
    setScrolled(window.scrollY > 60);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathName]);

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }
      );
      gsap.fromTo(
        ".nav-link",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07, delay: 0.35, clearProps: "transform,opacity" }
      );
    },
    { scope: navRef }
  );

  return (
    <>
      <div
        ref={navRef}
        data-testid="navbar"
        data-dark={isDark ? "true" : "false"}
        className={`w-full h-20 fixed top-0 left-0 right-0 transition-all duration-500 ${
          isDark
            ? "bg-gray-800/95 backdrop-blur-sm border-b border-white/10 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <GiHamburgerMenu color="white" size={26} />
            </button>
            <ul className="hidden md:flex items-center gap-x-1">
              {links.map((link) => {
                const isActive =
                  (link.href === "/" && pathName === "/") ||
                  (link.href !== "/" && pathName.includes(link.href));
                return (
                  <li key={link.name} className="nav-link">
                    <Link
                      href={link.href}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "text-orange"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
