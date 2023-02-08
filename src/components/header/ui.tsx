import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaLayout } from "shared/hooks/mobile";
import { Busked, Menu } from "shared/icons";

export const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaLayout();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav id="header" className="w-full z-1 top-0 py-1">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-3 md:px-6 py-3">
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer md:hidden block"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className={`absolute left-0 top-10 z-10 m-5 w-[90%] md:h-full md:top-0 md:relative md:m-0 md:flex md:items-center md:w-auto order-3 md:order-1 transform-all duration-500 rounded-lg mt-6 bg-black/[.90] md:bg-transparent ${
            isMobile &&
            (isOpen ? "translate-x-0 opacity-1" : "-translate-x-80 opacity-0")
          }`}
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base md:pt-0">
              <li>
                <a
                  href="/main"
                  className="inline-block dark:text-yellow-500 dark:hover:text-indigo-500 no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/main");
                  }}
                >
                  Find Recipe
                </a>
              </li>
              <li>
                <a
                  href="/fridge"
                  className="inline-block dark:text-yellow-500 dark:hover:text-indigo-500 no-underline hover:text-black hover:underline py-2 px-4 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/fridge");
                  }}
                >
                  My Fridge
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <a
            href="/main"
            className="dark:text-yellow-500 dark:hover:text-indigo-500 flex items-center tracking-wide no-underline hover:no-underline font-bold text-2xl cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/main");
            }}
          >
            Coffee Pub
          </a>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">
          {/* <a className="inline-block no-underline hover:text-black" href="#">
            <svg
              className="fill-current hover:text-black dark:text-yellow-500 dark:hover:text-indigo-500 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle fill="none" cx="12" cy="7" r="3" />
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
            </svg>
          </a> */}

          <a
            aria-label="Shop overview"
            href="/shop"
            className="pl-3 inline-block no-underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/shop");
            }}
          >
            <Busked />
          </a>
        </div>
      </div>
    </nav>
  );
};
