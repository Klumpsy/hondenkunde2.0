import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

export default function Loading() {
  <div className="w-full h-full flex items-center justify-center">
    loading...
  </div>;
}
