import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from '../actions/index';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedItems: []
};


const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN: return {
      ...state,
      loading: true,
      error: null
    }
    case FETCH_PRODUCTS_SUCCESS: return {
      ...state,
      loading: false,
      items: action.products
    }
    case SELECT_PRODUCT: {
      const { product } = action;
      const { selectedItems } = state;
      let newSelectedItems = [];
      if (selectedItems.some(i => i.id === product.id)) {
        return state;
      }
      newSelectedItems = [...selectedItems, product];

      return {
        ...state,
        selectedItems: newSelectedItems
      };
    }
    case UNSELECT_PRODUCT: {
      const { id } = action;
      const { selectedItems } = state;
      return {
        ...state,
        selectedItems: selectedItems.filter(i => i.id !== id)
      }
    }
    default: return state;
  }
}

export default productsReducer