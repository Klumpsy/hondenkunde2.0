"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const PawFromArti = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showLogo) {
      timer = setTimeout(() => setShowLogo(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [showLogo]);

  const handleButtonClick = () => {
    setShowLogo(true);
  };

  return (
    <div className="flex text-orange">
      <button
        onClick={handleButtonClick}
        className="my-4 mx-0 sm:mx-0 md:mx-12 lg:mx-12"
      >
        Geef pootje
      </button>
      {showLogo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="text-center animate-fadeInOut">
            <Image
              src="/images/logo.png"
              alt="Paw Logo"
              width={300}
              height={300}
            />
            <p className="text-white font-bold text-lg">Pootje van Arti!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PawFromArti;
