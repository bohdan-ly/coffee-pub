import { useDebouncedCallback } from "use-debounce";
import { notify } from "app/providers/with-notifications";
import { FloatingSidebar } from "components/floating-sidebar";
import Header from "components/header";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import Input from "shared/input";
import { Loading } from "shared/loading";
import { addBatch, addItem } from "store/fridge/slice";
import { Product } from "store/fridge/types";
import { selectProductsByCategories } from "store/products/selector";

export const ShopPage: React.FC = () => {
  const productQueue = React.useRef<Product[]>([]);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectProductsByCategories);

  const [search, setSearch] = React.useState("");

  const handleBuyProduct = useDebouncedCallback((product: Product) => {
    dispatch(addBatch(productQueue.current));
    notify({
      message: `Product${
        !productQueue.current.length ? "" : "'s"
      } was added successfully`,
      type: 200,
    });
    productQueue.current = [];
  }, 1000);

  // const handleBuyProduct = (product: Product) => {
  //   dispatch(addItem(product));
  //   debouncedSearchTerm();
  // };

  const handleImageError = (
    cat: string,
    { currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const refresh = +(currentTarget.getAttribute("data-refresh") || 0);
    if (!refresh) {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = `./src/assets/${cat.toLocaleLowerCase()}.jpeg`;
      currentTarget.setAttribute("data-refresh", `${refresh + 1}`);
    } else {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src = `./src/assets/food.svg`;
      currentTarget.setAttribute("data-refresh", `${refresh + 1}`);
    }
  };

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <h2 className="pt-6 pb-1 text-2xl font-semibold text-center">Shop</h2>
      <div className="w-full px-6 md:w-8/12 m-auto py-5">
        <Input value={search} onChange={(str) => setSearch(str)} />
      </div>
      <FloatingSidebar />
      <section className="align-middle flex h-full justify-center overflow-hidden py-12">
        <div className="flex flex-col h-full overflow-y-auto px-6 w-full md:w-8/12">
          {Object.keys(categories).map((cat) => {
            if (cat === "other") return null;
            const ingredients = categories[cat].filter(
              (i) =>
                i.strIngredient &&
                i.strIngredient
                  .toLocaleLowerCase()
                  .indexOf(search.trim().toLocaleLowerCase()) !== -1
            );
            if (!ingredients.length) return null;

            return (
              <div key={cat} className="text-sm leading-6">
                <h3>{cat}</h3>
                <ul className="h-full mb-8 pb-12 space-y-4 text-left">
                  {ingredients.map((i, idx) => {
                    return (
                      <li
                        key={`${i.idIngredient}_${idx}`}
                        className="flex items-center space-x-3 justify-between"
                      >
                        <div className="flex align-middle">
                          <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 mr-2">
                            <LazyLoadImage
                              data-refresh={0}
                              placeholder={<Loading className="scale-50" />}
                              alt={i.strIngredient}
                              src={i.image}
                              onError={(e) => handleImageError(cat, e)}
                            />
                          </div>
                          <span>{i.strIngredient}</span>
                        </div>
                        <button
                          aria-label={`buy ${i.strIngredient}`}
                          className="text-white bg-indigo-500 p-2 text-sm font-medium"
                          onClick={() => {
                            productQueue.current.push({
                              id: i.idIngredient,
                              emoji: "🍽️",
                              name: i.strIngredient,
                              count: 1,
                            });
                            handleBuyProduct({
                              id: i.idIngredient,
                              emoji: "🍽️",
                              name: i.strIngredient,
                              count: 1,
                            });
                          }}
                        >
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
              {categories.other?.map((i, idx) => {
                if (
                  !i.strIngredient ||
                  i.strIngredient
                    .toLocaleLowerCase()
                    .indexOf(search.trim().toLocaleLowerCase()) === -1
                )
                  return null;
                return (
                  <li
                    key={`${i.idIngredient}_${idx}`}
                    className="flex items-center space-x-3 justify-between"
                  >
                    <div className="flex align-middle">
                      <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 mr-2">
                        <LazyLoadImage
                          data-refresh={0}
                          placeholder={<Loading className="scale-50" />}
                          alt={i.strIngredient}
                          src={i.image}
                          onError={(e) => handleImageError("other", e)}
                        />
                      </div>
                      <span>{i.strIngredient}</span>
                    </div>
                    <button
                      aria-label={`buy ${i.strIngredient}`}
                      className="text-white bg-indigo-500 p-2 text-sm font-medium"
                      onClick={() => {
                        productQueue.current.push({
                          id: i.idIngredient,
                          emoji: "🍽️",
                          name: i.strIngredient,
                          count: 1,
                        });
                        handleBuyProduct({
                          id: i.idIngredient,
                          emoji: "🍽️",
                          name: i.strIngredient,
                          count: 1,
                        });
                      }}
                    >
                      Buy
                    </button>
                  </li>
                );
              }) || null}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
