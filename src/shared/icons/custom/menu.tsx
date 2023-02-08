import React from "react";

export const Menu: React.FC<{
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}> = ({ width, height, fill, stroke, className }) => {
  return (
    <svg
      width={width || "20"}
      height={height || "20"}
      className={className || "currentColor"}
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <title>menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
    </svg>
  );
};
