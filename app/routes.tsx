import { AiOutlineHome } from "react-icons/ai";
import { RxReader } from "react-icons/rx";
import { PiBoneLight } from "react-icons/pi";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineExplore } from "react-icons/md";

const navLinks = [
  { name: "Home", href: "/", icon: <AiOutlineHome /> },
  { name: "Arti's Rating", href: "/artiRating", icon: <PiBoneLight /> },
  {
    name: "Promo's",
    href: "/artiActie",
    icon: <TbDiscountCheckFilled />,
  },
  { name: "Blog", href: "/blog", icon: <RxReader /> },
  { name: "Arti op reis", href: "/arti-op-reis", icon: <MdOutlineExplore /> },
];

export default navLinks;
