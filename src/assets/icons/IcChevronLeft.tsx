import * as React from "react";
import { memo, type SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.5 17-5-5 5-5"
    />
  </svg>
);
const IcChevronLeft = memo(SvgComponent);
export default IcChevronLeft;
