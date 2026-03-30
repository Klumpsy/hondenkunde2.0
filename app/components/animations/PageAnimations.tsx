"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function PageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const init = () => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<Element>(".anim-fade-up").forEach((el) => {
          const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92;

          gsap.fromTo(
            el,
            { y: inView ? 22 : 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: inView ? 0.08 : 0,
              clearProps: "transform,opacity",
              ...(inView
                ? {}
                : {
                    scrollTrigger: {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                    },
                  }),
            }
          );
        });

        gsap.utils.toArray<Element>(".anim-stagger").forEach((container) => {
          const children = Array.from(container.children);
          if (!children.length) return;

          const inView = container.getBoundingClientRect().top < window.innerHeight * 0.92;

          gsap.fromTo(
            children,
            { y: inView ? 22 : 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.09,
              delay: inView ? 0.08 : 0,
              clearProps: "transform,opacity",
              ...(inView
                ? {}
                : {
                    scrollTrigger: {
                      trigger: container,
                      start: "top 88%",
                      once: true,
                    },
                  }),
            }
          );
        });

        ScrollTrigger.refresh();
      });
    };

    // Double RAF + short timeout ensures server-rendered content is fully
    // painted before GSAP queries the DOM.
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        timeoutId = setTimeout(init, 60);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
