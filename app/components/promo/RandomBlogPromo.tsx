"use client";

import { useEffect, useState } from "react";
import PromoCodeHondenShop from "./PromoCodeHondenShop";
import PromoCodeBellaDuke from "./PromoCodeBellaDuke";

const RandomBlogPromo = () => {
  const [showBella, setShowBella] = useState(false);

  useEffect(() => {
    setShowBella(Math.random() < 0.5);
  }, []);

  return showBella ? <PromoCodeBellaDuke /> : <PromoCodeHondenShop />;
};

export default RandomBlogPromo;
