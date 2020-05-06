export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const UNSELECT_PRODUCT = 'UNSELECT_PRODUCT';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const receiveProducts = (products) => {
  return ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
  });
};

export const selectProduct = product => {
  return ({
    type: SELECT_PRODUCT,
    product
  });
};

export const unselectProduct = id => {
  return ({
    type: UNSELECT_PRODUCT,
    id
  });
}

export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch(fetchProductsBegin());
    fetch('/data/products.json')
      .then(res => res.json())
      .then(json => dispatch(receiveProducts(json)));
  }
};