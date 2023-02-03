import React from "react";

export const RecipeCard = () => {
  return (
    <div className="flex justify-center overflow-y-auto">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div className="bg-slate-100 dark:bg-black/[.90] bg-fixed">
          <h3 className="text-3xl font-bold dark:text-white p-1.5">Spicy Arrabiata Penne</h3>
          <a href="#!">
            <img className="" src="https:\/\/www.themealdb.com\/images\/media\/meals\/ustsqw1468250014.jpg" alt=""/>
            {/* <iframe className="w-full aspect-[4/3]" src="https:\/\/www.youtube.com\/watch?v=1IszT_guI08"></iframe> */}
          </a>
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
              <strong>Indredients:</strong>
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

            <br/>
            <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
            <strong>Recipe:</strong>
            </h5>
            <p className="text-gray-700 text-base mb-4 dark:text-white">
              Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package.
              Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package.
              Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
