import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from 'react';
import Logo from "./Logo";
import {GiHamburgerMenu} from 'react-icons/gi';

type NavbarProps = {
  toggle: () => void;
  links: { name: string; href: string }[];
};

const Navbar: React.FC<NavbarProps> = ({ toggle, links }) => {

  const pathName = usePathname();

  return (
    <>
      <div className="w-full h-20 bg-gray-800 sticky top-0 border-b border-white relative" style={{zIndex:1000}}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <GiHamburgerMenu color='white' size={32}/>
            </button>
            <ul className="hidden md:flex gap-x-6">
            {links.map(link => (
              <li className={pathName === link.href ? "text-orange" : "text-white"} key={link.name}>
                <Link href={link.href}>
                  <p>{link.name}</p>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;