import axios from "axios";

// import { Product } from "../types/models";

// interface ProductDataProps {
//   data: Product[];
// }
// interface ProductDetailsProps {
//   data: Product;
// }

export async function loadProducts() {
  try {
    const { data } = await axios.get(
      //   `${CONSTANTS.URL}/api/products`
      `https://nbti.globalfood-s.com/public/api/products`
    );

    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}

export async function loadProductDetails(productId) {
  try {
    const { data } = await axios.get(
      //   `${CONSTANTS.URL}/api/products/details/${productId}`
      `https://nbti.globalfood-s.com/public/api/products/details/${productId}`
    );

    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}
