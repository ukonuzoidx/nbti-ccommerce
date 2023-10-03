export const getProductData = (productData) => {
  return {
    type: "getProducts",
    payload: productData,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    dispatch(getProductData(data));
  };
}

