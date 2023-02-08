import React from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { CloseIcon, Search } from "shared/icons";
import { selectFilterQuery } from "store/filter/selector";
import { setQuery } from "store/filter/slice";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectFilterQuery);
  const [search, setSearch] = React.useState(query || "");

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!!search) {
      const _query = search.trim();
      dispatch(setQuery(_query));
    }
  };

  return (
    <form
      className="flex items-center flex-col md:flex-row"
      onSubmit={(ev) => ev && onSubmit(ev)}
    >
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          value={search}
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Recipe"
          required
          onChange={(e) => setSearch(e.target.value)}
        />
        {!!search.trim() && (
          <CloseIcon
            width={20}
            height={20}
            className="absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer text-gray-500 dark:text-gray-400"
            onClick={() => {
              setSearch("");
              dispatch(setQuery(""));
            }}
          />
        )}
      </div>

      <button
        aria-label="search"
        type="submit"
        className="mt-5 md:mt-0 focus:outline-none duration-300 transition inline-flex items-center py-2.5 px-3 md:ml-2 text-sm font-medium text-black bg-indigo-400 rounded-lg hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-500"
      >
        <Search />
        Search
      </button>
    </form>
  );
};
