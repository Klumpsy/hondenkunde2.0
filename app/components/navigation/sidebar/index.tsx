"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
  links: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle, links }) => {
  const pathName = usePathname();

  return (
    <>
      <div
        className={`fixed w-full h-full bg-gray-900 top-0 left-0 transition-transform duration-100 ease-in-out transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } `}
        style={{ zIndex: 2000 }}
      >
        <button className="absolute right-0 p-5" onClick={toggle}>
          <RxCross2 color="white" size={32} />
        </button>

        <ul className="sidebar-nav text-white mt-20 text-center leading-relaxed text-xl">
          {links.map((link) => (
            <li
              key={link.name}
              className={
                (link.href === "/" && pathName === "/") ||
                (link.href !== "/" && pathName.includes(link.href))
                  ? "text-orange"
                  : "text-white"
              }
            >
              <div onClick={toggle}>
                <Link href={link.href} className="flex items-center space-x-2">
                  {link.icon}
                  <p className="m-0">{link.name}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
