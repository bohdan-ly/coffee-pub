import React from "react";

export const FeedToolbar = () => {
  return (
    <nav id="store" className="w-full z-1 top-0 md:px-6 py-1">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 md:px-2 py-3">
        <h2
          className="uppercase tracking-wide no-underline hover:no-underline font-bold text-xl text-indigo-500 dark:text-white"
        >
          Categories
        </h2>
      </div>
    </nav>
  );
};
