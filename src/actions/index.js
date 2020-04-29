export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const receiveProducts = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products
});

export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch(fetchProductsBegin());
    fetch('/data/products.json')
      .then(res => res.json())
      .then(json => dispatch(receiveProducts(json)));
  }
};