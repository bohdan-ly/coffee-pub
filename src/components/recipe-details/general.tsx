import { notify } from "app/providers/with-notifications";
import { YoutubeEmbed } from "components/youtube-embed";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { selectFridgeProducts } from "store/fridge/selector";
import { removeBatch } from "store/fridge/slice";
import { setRecipe } from "store/recipes/slice";
import { Ingredients, RecipeDetails } from "store/recipes/types";

export const FullRecipe: React.FC<{ recipe: RecipeDetails }> = ({ recipe }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectFridgeProducts);

  const handleCloseRecipe = () => {
    dispatch(setRecipe(null));
  };

  const handleCook = () => {
    const ids = Object.keys(recipe.ingredients || {}).reduce(
      (a: string[], v) => {
        const ingrd = products.find(
          (p) => p.name.toLocaleLowerCase() === v.toLocaleLowerCase()
        );
        if (ingrd) {
          a.push(ingrd.id);
        }
        return a;
      },
      []
    );
    if (ids.length === Object.keys(recipe.ingredients || {}).length) {
      dispatch(removeBatch(ids));
    }
    notify({ message: "Dish was cooked successfully. Good job", type: 200 });
  };

  return (
    <section className="flex flex-col h-full p-8 overflow-y-auto mb-20 md:md-0">
      <div className="container pt-6 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="flex gap-8 flex-wrap md:flex-nowrap">
            <div className="flex flex-col w-full">
              <h2 className="text-3xl font-bold dark:text-white flex justify-center pb-6 lg:w-1/2 text-left">
                {recipe.strMeal}
              </h2>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex flex-col w-full lg:w-1/2">
                  <YoutubeEmbed
                    url={recipe.strYoutube}
                    fallbackSrc={recipe.strMealThumb}
                  />
                  <button
                    aria-label="cook"
                    onClick={recipe.isCookable ? handleCook : () => {}}
                    className={`text-white bg-indigo-500 p-2 text-sm font-medium ${
                      recipe.isCookable ? "" : "opacity-75 pointer-events-none"
                    }`}
                  >
                    Cook
                  </button>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                  <div className="flex flex-col w-full lg:w-1/2">
                    <h3 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                      <strong>Category:</strong>
                    </h3>
                    <div className="py-4">
                      {(recipe.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-indigo-500 hover:text-white"
                        >
                          #{tag}
                        </span>
                      ))}
                      <span className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-indigo-500 hover:text-white">
                        #{recipe.strArea}
                      </span>
                      <span className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-indigo-500 hover:text-white">
                        #{recipe.strCategory}
                      </span>
                    </div>
                    <h3 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                      <strong>Ingredients:</strong>
                    </h3>
                    <table className="w-full table-fixed text-left">
                      <tbody className="align-baseline ingredients-list">
                        {Object.keys(recipe.ingredients || {}).map(
                          (ingredientKey) => {
                            const isAvailable = products.find(
                              (p) =>
                                p.name?.toLocaleLowerCase() ===
                                ingredientKey.toLocaleLowerCase()
                            );
                            return (
                              <tr
                                key={ingredientKey}
                                className={`flex align-middle justify-between w-full ${
                                  isAvailable ? "" : "text-orange-400"
                                }`}
                              >
                                <td className="">{ingredientKey}</td>
                                <td className="flex align-middle">
                                  {isAvailable
                                    ? (recipe.ingredients as Ingredients)[
                                        ingredientKey
                                      ]
                                    : "Not enoughs"}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:py-6 mt-6 lg:mt-0">
            <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
              <strong>Recipe:</strong>
            </h5>
            <p className="leading-relaxed">{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
