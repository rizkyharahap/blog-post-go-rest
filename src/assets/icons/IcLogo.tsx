import * as React from "react";
import { memo, type SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={61}
    viewBox="0 0 60 61"
    fill="none"
    {...props}
  >
    <path
      fill="#404040"
      d="M30 18.5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12Z"
    />
    <path
      fill="#FFD11A"
      d="M54 18.5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12Z"
    />
    <path
      fill="#404040"
      d="M54 42.5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12Z"
    />
    <path
      fill="#FFD11A"
      d="M30 42.5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12Z"
    />
  </svg>
);
const IcLogo = memo(SvgComponent);
export default IcLogo;
