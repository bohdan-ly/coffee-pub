import { YoutubeEmbed } from "components/youtube-embed";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { CloseIcon } from "shared/icons";
import { selectRecipeDetails } from "store/recipes/selector";
import { setRecipe } from "store/recipes/slice";

export const RecipeDetails = () => {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((store) => selectRecipeDetails(store)) || {
    strMeal: "Unknown",
    strYoutube: "",
    strMealThumb: "",
  };

  const handleCloseRecipe = () => {
    dispatch(setRecipe(null));
  };

  return (
    <div
      className={`transition-all duration-300 relative ${
        !recipe.strMealThumb
          ? "basis-0 w-0 opacity-0"
          : "md:basis-1/3 opacity-100"
      }`}
    >
      {!!recipe.strMealThumb && (
        <CloseIcon
          className="absolute -right-4 -top-4 w-8 cursor-pointer rounded-full hover:bg-yellow-600"
          onClick={handleCloseRecipe}
        />
      )}
      <div className="flex justify-center overflow-y-auto">
        <div className="rounded-lg shadow-lg bg-white max-w-sm">
          <div className="bg-slate-100 dark:bg-black/[.90] bg-fixed">
            <h3 className="text-3xl font-bold dark:text-white p-1.5 flex justify-center">
              {recipe.strMeal}
            </h3>
            <a href="#">
              <YoutubeEmbed
                url={recipe.strYoutube}
                fallbackSrc={recipe.strMealThumb}
              />
            </a>
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                <strong>Ingredients:</strong>
              </h5>
              <table className="w-full table-fixed text-left">
                <tbody className="align-baseline">
                  <tr>
                    <td className="py-2">penne rigate</td>
                    <td>1 pound</td>
                  </tr>
                  <tr>
                    <td>olive oil</td>
                    <td>1/4 cup</td>
                  </tr>
                  <tr>
                    <td className="py-2">penne rigate</td>
                    <td>1 pound</td>
                  </tr>
                  <tr>
                    <td>olive oil</td>
                    <td>1/4 cup</td>
                  </tr>
                </tbody>
              </table>

              <br />
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                <strong>Recipe:</strong>
              </h5>
              <p className="text-gray-700 text-base mb-4 dark:text-white">
                Bring a large pot of water to a boil. Add kosher salt to the
                boiling water, then add the pasta. Cook according to the
                package. Bring a large pot of water to a boil. Add kosher salt
                to the boiling water, then add the pasta. Cook according to the
                package. Bring a large pot of water to a boil. Add kosher salt
                to the boiling water, then add the pasta. Cook according to the
                package.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
