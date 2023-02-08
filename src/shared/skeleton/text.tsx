import React from "react";

export const Text: React.FC<{ width?: string; height?: string }> = ({
  width,
  height,
}) => {
  return (
    <div
      style={{ width: width || "", height: height || "" }}
      role="status"
      className="w-full relative"
    >
      <div
        className="absolute w-10/12 h-full overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent left-2"
      />
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10/12 mt-4 m-auto"></div>
    </div>
  );
};
