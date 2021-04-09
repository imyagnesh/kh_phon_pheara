import { useReducer } from 'react';
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
import productsReducer, { productInitialState } from '../reducers/productsReducer';

const useProducts = () => {
  const [products, dispatchProducts] = useReducer(productsReducer, productInitialState);

  const fetchProducts = async () => {
    try {
      dispatchProducts({
        type: FETCH_PRODUCTS_REQUEST,
      });
      const res = await fetch('http://localhost:3000/products');
      const payload = await res.json();
      dispatchProducts({
        type: FETCH_PRODUCTS_SUCCESS,
        payload,
      });
    } catch (error) {
      dispatchProducts({
        type: FETCH_PRODUCTS_FAIL,
        payload: error,
      });
    }
  };

  const addProduct = async (data) => {
    try {
      dispatchProducts({
        type: ADD_PRODUCTS_REQUEST,
      });
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const payload = await res.json();
      dispatchProducts({
        type: ADD_PRODUCTS_SUCCESS,
        payload,
      });
    } catch (error) {
      dispatchProducts({
        type: ADD_PRODUCTS_FAIL,
        payload: error,
      });
    }
  };

  const editProduct = async (data) => {
    try {
      dispatchProducts({
        type: EDIT_PRODUCTS_REQUEST,
      });
      const res = await fetch(`http://localhost:3000/products/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const payload = await res.json();
      dispatchProducts({
        type: EDIT_PRODUCTS_SUCCESS,
        payload,
      });
    } catch (error) {
      dispatchProducts({
        type: EDIT_PRODUCTS_FAIL,
        payload: error,
      });
    }
  };

  return {
    fetchProducts,
    addProduct,
    editProduct,
    products,
  };
};

export default useProducts;
