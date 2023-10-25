"use client";

import { useState } from "react";

function CopyPromoCode() {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText("CADEAU_VAN_ARTI")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy", err));
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <h3
        className="text-orange font-bold text-xl cursor-pointer"
        onClick={handleCopyClick}
      >
        CADEAU_VAN_ARTI
      </h3>
      {copied && <span className="text-green-500">Gekopieërd</span>}
    </div>
  );
}

export default CopyPromoCode;
