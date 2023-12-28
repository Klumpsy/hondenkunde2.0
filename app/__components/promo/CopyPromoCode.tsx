"use client";

import { useState } from "react";

function CopyPromoCode() {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText("CADEAU_VAN_ARTI")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy", err));
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="relative">
        <h3
          className="text-orange font-bold text-xl cursor-pointer"
          onClick={handleCopyClick}
        >
          CADEAU_VAN_ARTI
        </h3>
        <span
          className={`text-green-500 absolute top-full left-0 transition-opacity duration-500 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Gekopieërd
        </span>
      </div>
    </div>
  );
}

export default CopyPromoCode;
