"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dropped into layout.tsx — runs on every route change and sets up
 * scroll-triggered animations for any element with:
 *   .anim-fade-up   → fades + slides up individually
 *   .anim-stagger   → staggers direct children as they enter the viewport
 *
 * SEO safe: content is server-rendered at full opacity.
 * GSAP only runs client-side and adds the motion layer.
 */
export default function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.utils.toArray<Element>(".anim-fade-up").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.95;

        if (inViewport) {
          gsap.fromTo(
            el,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.05, clearProps: "transform,opacity" }
          );
        } else {
          gsap.fromTo(
            el,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                once: true,
              },
            }
          );
        }
      });

      gsap.utils.toArray<Element>(".anim-stagger").forEach((container) => {
        const children = Array.from(container.children);
        if (!children.length) return;

        const rect = container.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.95;

        if (inViewport) {
          gsap.fromTo(
            children,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.07,
              delay: 0.05,
              clearProps: "transform,opacity",
            }
          );
        } else {
          gsap.fromTo(
            children,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.07,
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: container,
                start: "top 92%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
