import {
  ADD_PRODUCTS_FAIL,
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS_FAIL,
  EDIT_PRODUCTS_REQUEST,
  EDIT_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants/actionTypes';

export const productInitialState = {
  isFetching: false,
  fetchError: false,
  products: [],
  isCreating: false,
  createError: false,
  isEditing: false,
  editError: false,
};

export default (state, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, isFetching: true };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, isFetching: false, products: payload };

    case FETCH_PRODUCTS_FAIL:
      return { ...state, isFetching: false, fetchError: payload };

    case ADD_PRODUCTS_REQUEST:
      return { ...state, isCreating: true };

    case ADD_PRODUCTS_SUCCESS:
      return { ...state, isCreating: false, products: [...state.products, payload] };

    case ADD_PRODUCTS_FAIL:
      return { ...state, isCreating: false, createError: payload };

    case EDIT_PRODUCTS_REQUEST:
      return { ...state, isEditing: true };

    case EDIT_PRODUCTS_SUCCESS: {
      const index = state.products.findIndex((element) => element.id === payload.id);
      const updatedProducts = [
        ...state.products.slice(0, index),
        payload,
        ...state.products.slice(index + 1),
      ];
      return { ...state, isEditing: false, products: updatedProducts };
    }

    case EDIT_PRODUCTS_FAIL:
      return { ...state, isEditing: false, editError: payload };

    default:
      return state;
  }
};
