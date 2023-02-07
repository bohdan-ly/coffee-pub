import { YoutubeEmbed } from "components/youtube-embed";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { CloseIcon, ExpandIcon } from "shared/icons";
import { selectFridgeProducts } from "store/fridge/selector";
import { setRecipe } from "store/recipes/slice";
import { Ingredients, RecipeDetails } from "store/recipes/types";

export type Props = {
  recipe: RecipeDetails;
};

export const RecipeOverview: React.FC<Props> = ({ recipe }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(selectFridgeProducts);

  const handleCloseRecipe = () => {
    dispatch(setRecipe(null));
  };

  return (
    <div
      className={`transition-all duration-300 h-full overflow-hidden pr-4 pt-4 pb-24 relative ${
        !recipe.strMealThumb
          ? "basis-0 w-0 opacity-0"
          : "md:basis-1/3 opacity-100"
      }`}
    >
      <div className="flex justify-center overflow-y-auto h-full">
        <div className="bg-white h-full max-w-sm overflow-hidden rounded-lg shadow-lg">
          <div className="bg-fixed bg-slate-100 dark:bg-black/[.90] flex flex-col h-full overflow-hidden">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-3xl font-bold dark:text-white p-4 flex justify-center text-center">
                {recipe.strMeal}
              </h3>
              <div className="flex flex-col justify-between px-2">
                <CloseIcon
                  className="top-0 w-8 cursor-pointer hover:text-indigo-500 pb-2"
                  onClick={handleCloseRecipe}
                />
                <ExpandIcon
                  className="w-8 cursor-pointer hover:text-indigo-500 pb-2"
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                />
              </div>
            </div>
            <a href="#">
              <YoutubeEmbed
                url={recipe.strYoutube}
                fallbackSrc={recipe.strMealThumb}
              />
            </a>
            <div className="px-6 pt-4">
              {(recipe.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:underline"
                >
                  #{tag}
                </span>
              ))}
              <span className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:underline">
                #{recipe.strArea}
              </span>
              <span className="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:underline">
                #{recipe.strCategory}
              </span>
            </div>
            <div className="flex flex-col h-full overflow-hidden p-6 mb-2 relative">
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                <strong>Ingredients:</strong>
              </h5>
              <table className="w-full table-fixed text-left">
                <tbody className="align-baseline">
                  {Object.keys(recipe.ingredients || {})
                    .slice(0, 3)
                    .map((ingredientKey) => {
                      const isAvailable = products.find(
                        (p) =>
                          p.name?.toLocaleLowerCase() ===
                          ingredientKey.toLocaleLowerCase()
                      );
                      return (
                        <tr
                          key={ingredientKey}
                          className={isAvailable ? "" : "text-orange-400"}
                        >
                          <td className="py-2">{ingredientKey}</td>
                          <td>
                            {isAvailable
                              ? (recipe.ingredients as Ingredients)[
                                  ingredientKey
                                ]
                              : "Not enoughs"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <br />
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                <strong>Recipe:</strong>
              </h5>
              <p className="text-gray-700 text-base dark:text-white truncate">
                {recipe.strInstructions}
              </p>
              <div className="absolute bottom-0 left-0 text-center text-white w-full cursor-pointer hover:underline bg-white">
                <span
                  className="w-full h-full dark:bg-black/[.90] flex justify-center"
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                >
                  Read More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
