"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {

    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Arti\'s Rating', href: '/artiRating' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} links={navLinks}/>
      <Navbar toggle={toggle} links={navLinks} />
    </>
  );
};

export default Navigation;