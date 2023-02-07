import { FloatingSidebar } from "components/floating-sidebar";
import Header from "components/header";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppSelector } from "shared/hooks/global";
import { Loading } from "shared/loading";
import { selectProducts } from "store/products/selector";

export const ShopPage: React.FC = () => {
  const { items: products } = useAppSelector((store) => selectProducts(store));

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <h2 className="pt-6 pb-1 text-2xl font-semibold text-center">Shop</h2>
      <FloatingSidebar />
      <section className="flex justify-center align-middle h-full py-12">
        <ul className="mb-8 space-y-4 text-left">
          {products.map((i, idx) => (
            <li
              key={`${i.idIngredient}_${idx}`}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400">
                <LazyLoadImage
                  // placeholderSrc="/assets/loading.gif"
                  placeholder={<Loading className="scale-50" />}
                  alt={i.strIngredient}
                  src={i.image}
                />
              </div>
              <span>{i.strIngredient}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
