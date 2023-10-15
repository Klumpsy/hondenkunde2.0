import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };

export default function Loading() {
    <ClipLoader
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
}