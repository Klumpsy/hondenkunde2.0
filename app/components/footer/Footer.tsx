"use client";
import React from "react";
import Image from "next/image";
import navLinks from "@/app/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-orange font-bold mb-3">Navigatie</h3>
            <ul>
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className={
                    (link.href === "/" && pathName === "/") ||
                    (link.href !== "/" && pathName.includes(link.href))
                      ? "text-orange mb-2"
                      : "text-white mb-2"
                  }
                >
                  <div>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2"
                    >
                      {link.icon}
                      <p className="m-0">{link.name}</p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-orange font-bold mb-3">
              Werknemer van de maand
            </h3>
            <div className="pl-0 lg:pl-14">
              <Image
                src="/images/employeeOfTheMonth.jpg"
                className="rounded-full"
                width={80}
                height={80}
                alt="Rated by dog"
              />
            </div>
          </div>

          <div>
            <h3 className="text-orange font-bold mb-3">Shops</h3>
            <ul>
              <li className="mb-2 hover:text-white">
                <a href="https://www.hondenshop.nl" target="_blank">
                  Hondenshop
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6 text-center md:text-left md:flex md:justify-between">
          <p>&copy; {new Date().getFullYear()} Hondenkunde</p>
          <p>Gemaakt met 💙 voor honden</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
