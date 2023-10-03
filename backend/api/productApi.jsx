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
      `http://127.0.0.1:8000/api/products`
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
      `http://127.0.0.1:8000/api/products/details/${productId}`
    );

    return data;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.log(message);
  }
}
