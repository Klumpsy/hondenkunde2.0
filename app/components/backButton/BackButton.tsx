"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type BackButtonProps = {
  href: string;
  text: string;
  className?: string;
};

const BackButton = ({ href, text, className }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={
        className ||
        "font-extrabold bg-orange text-darkBlue py-3 px-5 rounded-full shadow-md hover:bg-gray-800 hover:text-orange transition"
      }
    >
      <ArrowBackIcon className="mr-2" />
      {text}
    </Link>
  );
};

export default BackButton;
