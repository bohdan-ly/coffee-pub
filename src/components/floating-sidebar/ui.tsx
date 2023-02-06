import { GroceryList } from "components/grocery-list";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon, ExpandIcon, Snowflake } from "shared/icons";

export const FloatingSidebarContext = React.createContext({
  isSidebarOpen: false,
  setSidebarOpen: (open: boolean) => {},
});

export const FloatingSidebar: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="text-center absolute right-0 top-20">
        <button
          className="rounded-tr-lg rounded-br-lg w-14 hover:w-16 transition-all
          bg-indigo-500 hover:bg-yellow-500 rounded-l-lg text-sm px-5 py-2.5
          dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Snowflake />
        </button>
      </div>
      {isOpen && (
        <div
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
        />
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 right-0 z-40  h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 ${
          isOpen ? "transform-none w-4/12" : "translate-x-full"
        }`}
        tabIndex={-1}
        aria-modal={true}
        role="dialog"
      >
        <h2 className="pb-6 text-2xl font-semibold">
          List of my products:
        </h2>
        <ExpandIcon
          className="absolute right-0 top-10 w-8 cursor-pointer rounded-full hover:bg-yellow-600 p-1"
          onClick={() => navigate(`/fridge`)}
        />
        <CloseIcon
          className="absolute right-0 top-0 w-8 cursor-pointer rounded-full hover:bg-yellow-600 p-1"
          onClick={() => setIsOpen(false)}
        />
        <GroceryList />
      </div>
      {children}
    </>
  );
};
