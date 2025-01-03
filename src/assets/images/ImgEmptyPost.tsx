import * as React from "react";
import { memo, type SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="posts-empty"
    xmlns="http://www.w3.org/2000/svg"
    width={118}
    height={110}
    viewBox="0 0 118 110"
    fill="none"
    {...props}
  >
    <path
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M102.731 26.66v4.31M100.581 28.81h4.3M14.571 10.03v4.3M12.411 12.18h4.31"
    />
    <path
      fill="#CFCFCF"
      d="M48.031 1.96a.98.98 0 1 0 0-1.96.98.98 0 0 0 0 1.96Z"
    />
    <path
      fill="#F2F2F2"
      d="M79.451 40.92c-8.37 0-16.89-.34-24.86-2.56-7.82-2.17-15-6.38-21.4-11.25-4.19-3.17-8-5.69-13.44-5.31a24.84 24.84 0 0 0-14.52 5.7c-6.92 6-5.88 17.23-3.11 25.12 4.16 11.88 16.82 20.11 27.58 25.49 12.43 6.21 26.09 9.81 39.78 11.89 12 1.82 27.42 3.15 37.82-4.69 9.55-7.2 12.17-23.64 9.83-34.74a13.668 13.668 0 0 0-4.91-8.33c-6.71-4.9-16.72-1.63-24.26-1.46-2.8.06-5.65.13-8.51.14ZM58.971 109.45c20.275 0 36.71-1.025 36.71-2.29 0-1.265-16.435-2.29-36.71-2.29-20.274 0-36.71 1.025-36.71 2.29 0 1.265 16.436 2.29 36.71 2.29Z"
    />
    <path
      fill="#D2D2D2"
      d="M74.564 3.321 25.689 9.93a2.86 2.86 0 0 0-2.451 3.218l9.478 70.102a2.86 2.86 0 0 0 3.217 2.451l48.876-6.608a2.86 2.86 0 0 0 2.45-3.218L77.782 5.772a2.86 2.86 0 0 0-3.217-2.45Z"
    />
    <path
      fill="#fff"
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M90.801 13.61h-49.32a2.86 2.86 0 0 0-2.86 2.86v70.74a2.86 2.86 0 0 0 2.86 2.86h49.32a2.86 2.86 0 0 0 2.86-2.86V16.47a2.86 2.86 0 0 0-2.86-2.86Z"
    />
    <path
      fill="#D2D2D2"
      d="M77.991 68.53h-23.71c-.889 0-1.61.72-1.61 1.61v.01c0 .89.721 1.61 1.61 1.61h23.71c.89 0 1.61-.72 1.61-1.61v-.01c0-.89-.72-1.61-1.61-1.61ZM77.141 81.73h-22.75a.49.49 0 0 0-.49.49v.15c0 .27.22.49.49.49h22.75c.271 0 .49-.22.49-.49v-.15a.49.49 0 0 0-.49-.49ZM82.941 76.44h-33.51a.65.65 0 0 0 0 1.3h33.51a.65.65 0 0 0 0-1.3Z"
    />
    <path
      fill="#fff"
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M89.071 15.94h-45.86a2.06 2.06 0 0 0-2.06 2.06v39.77a2.06 2.06 0 0 0 2.06 2.06h45.86a2.06 2.06 0 0 0 2.06-2.06V18a2.06 2.06 0 0 0-2.06-2.06Z"
    />
    <path
      fill="#fff"
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M72.261 47.5a1.61 1.61 0 0 0 1-2.84 11.48 11.48 0 0 0-14.8.13 1.6 1.6 0 0 0 1 2.82l12.8-.11Z"
    />
    <path
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.71}
      d="m80.431 37.49-5.83-3.36 5.83-3.37M51.371 37.49l5.83-3.36-5.83-3.37"
    />
    <path
      stroke="#BABABA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.401 58.82v4.31M17.251 60.97h4.31"
    />
    <path
      fill="#CFCFCF"
      d="M100.911 61.87a.98.98 0 1 0 0-1.96.98.98 0 0 0 0 1.96Z"
    />
  </svg>
);
const ImgEmptyPost = memo(SvgComponent);
export default ImgEmptyPost;
