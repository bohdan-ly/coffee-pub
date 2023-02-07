import { AppDispatch } from "app/model";
import { Api } from "app/model/api";
import { notify } from "app/providers/with-notifications";

const ProductActions = (dispatch: AppDispatch) => {
  return ({}) => {
    return {
      setProductCard: async (productId: string) => {
        try {
          if (!productId) {
            notify({ message: "Failed to get product" });
            return null;
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    };
  };
};

export { ProductActions };
