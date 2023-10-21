import { AiOutlineHome } from "react-icons/ai";
import { RxReader } from "react-icons/rx";
import { PiBoneLight } from "react-icons/pi";

const navLinks = [
  { name: "Home", href: "/", icon: <AiOutlineHome /> },
  { name: "Arti's Rating", href: "/artiRating", icon: <PiBoneLight /> },
  { name: "Blog", href: "/blog", icon: <RxReader /> },
];

export default navLinks;
