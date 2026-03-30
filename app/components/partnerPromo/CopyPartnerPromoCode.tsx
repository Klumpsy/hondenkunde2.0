"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CopyPartnerPromoCodeProps {
  promoCode: string;
  label?: string;
}

function CopyPartnerPromoCode({ promoCode, label }: CopyPartnerPromoCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(promoCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy", err));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">{label}</p>
      )}
      <div className="flex items-stretch w-full max-w-md border-2 border-dashed border-orange/60 hover:border-orange rounded-xl overflow-hidden transition-colors duration-200">
        <div className="flex-1 px-6 py-4 flex items-center">
          <span className="font-mono font-extrabold text-2xl text-orange tracking-widest">
            {promoCode}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label={`Kopieer kortingscode ${promoCode}`}
          className={`flex items-center gap-2 px-5 font-bold text-sm transition-all duration-200 cursor-pointer ${
            copied
              ? "bg-green-500 text-white"
              : "bg-orange text-darkBlue hover:bg-yellow-400"
          }`}
        >
          {copied ? <><FaCheck />Gekopieerd</> : <><FaCopy />Kopieer</>}
        </button>
      </div>
    </div>
  );
}

export default CopyPartnerPromoCode;
