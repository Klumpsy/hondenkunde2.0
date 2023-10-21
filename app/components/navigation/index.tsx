"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import navLinks from "@/app/routes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} links={navLinks} />
      <Navbar toggle={toggle} links={navLinks} />
    </>
  );
};

export default Navigation;
