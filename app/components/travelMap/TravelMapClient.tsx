"use client";

import dynamic from "next/dynamic";
import type { TravelLocation } from "./TravelMap";

interface TravelMapClientProps {
  travels: TravelLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

// dynamic + ssr:false must live inside a Client Component
const TravelMapDynamic = dynamic(() => import("./TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-800 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-sm font-medium text-gray-400">Kaart laden...</p>
    </div>
  ),
});

export default function TravelMapClient(props: TravelMapClientProps) {
  return <TravelMapDynamic {...props} />;
}
