import { FloatingSidebar } from "components/floating-sidebar";
import Header from "components/header";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppSelector } from "shared/hooks/global";
import { Loading } from "shared/loading";
import {
  selectProducts,
  selectProductsByCategories,
} from "store/products/selector";

export const ShopPage: React.FC = () => {
  const categories = useAppSelector(selectProductsByCategories);

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <h2 className="pt-6 pb-1 text-2xl font-semibold text-center">Shop</h2>
      <FloatingSidebar />
      <section className="align-middle flex h-full justify-center overflow-hidden py-12">
        <div className="flex flex-col h-full overflow-y-auto">
          {Object.keys(categories).map((cat) => {
            if (cat === "other") return null;
            return (
              <div key={cat} className="text-sm leading-6">
                <h3>{cat}</h3>
                <ul className="h-full mb-8 pb-12 space-y-4 text-left">
                  {categories[cat].map((i, idx) => {
                    let src = i.image;
                    return (
                      <li
                        key={`${i.idIngredient}_${idx}`}
                        className="flex items-center space-x-3 justify-between"
                      >
                        <div className="flex align-middle">
                          <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 mr-2">
                            <LazyLoadImage
                              // placeholderSrc="/assets/loading.gif"
                              placeholder={<Loading className="scale-50" />}
                              alt={i.strIngredient}
                              src={src}
                              // onError={(e) => {
                              //   console.log(e);
                              //   e.target.src = 
                              //   src = "/assets/loading.gif";
                              // }}
                            />
                          </div>
                          <span>{i.strIngredient}</span>
                        </div>
                        <button className="text-white bg-indigo-500 p-2 text-sm font-medium">
                          Buy
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className="text-sm leading-6">
            <h3>Other</h3>
            <ul className="h-full mb-8 pb-12 space-y-4 text-left">
              {categories.other?.map((i, idx) => (
                <li
                  key={`${i.idIngredient}_${idx}`}
                  className="flex items-center space-x-3 justify-between"
                >
                  <div className="flex align-middle">
                    <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 mr-2">
                      <LazyLoadImage
                        // placeholderSrc="/assets/loading.gif"
                        placeholder={<Loading className="scale-50" />}
                        alt={i.strIngredient}
                        src={i.image}
                      />
                    </div>
                    <span>{i.strIngredient}</span>
                  </div>
                  <button className="text-white bg-indigo-500 p-2 text-sm font-medium">
                    Buy
                  </button>
                </li>
              )) || null}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
