import { YoutubeEmbed } from "components/youtube-embed";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { CloseIcon, ExpandIcon } from "shared/icons";
import { selectRecipeDetails } from "store/recipes/selector";
import { setRecipe } from "store/recipes/slice";
import { Ingredients, RecipeDetails } from "store/recipes/types";

export const FullRecipe: React.FC<{ recipe: RecipeDetails }> = ({ recipe }) => {
  const dispatch = useAppDispatch();

  const handleCloseRecipe = () => {
    dispatch(setRecipe(null));
  };

  return (
    <section className="flex flex-col h-full p-8 overflow-y-auto">
      <div className="container py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="flex gap-8 flex-wrap lg:flex-nowrap">
            <div className="flex flex-col w-full lg:w-1/2">
              <h2 className="text-3xl font-bold dark:text-white p-4 flex justify-center text-center">
                {recipe.strMeal}
              </h2>
              <YoutubeEmbed
                url={recipe.strYoutube}
                fallbackSrc={recipe.strMealThumb}
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <h2 className="title-font tracking-widest">Category:</h2>
              <div className="pt-4">
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
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                <strong>Ingredients:</strong>
              </h5>
              <table className="w-full table-fixed text-left">
                <tbody className="align-baseline ingredients-list">
                  {Object.keys(recipe.ingredients || {}).map(
                    (ingredientKey) => (
                      <tr
                        key={ingredientKey}
                        className="flex align-middle justify-between w-full"
                      >
                        <td className="">{ingredientKey}</td>
                        <td className="flex align-middle">
                          {(recipe.ingredients as Ingredients)[ingredientKey]}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
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
