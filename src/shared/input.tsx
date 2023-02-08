import React, { ChangeEventHandler } from "react";
import { CloseIcon, Search } from "./icons";

const Input: React.FC<{
  value: string;
  onChange: (event: string) => void;
}> = ({ value = "", onChange = () => {} }) => {
  React.useEffect(() => {}, [value]);

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search />
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
        {!!value?.length && (
          <CloseIcon
            className="absolute right-2 top-[50%] -translate-y-[50%] w-8 cursor-pointer rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-yellow-600 p-1"
            onClick={() => onChange("")}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
