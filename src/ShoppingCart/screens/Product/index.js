import React from 'react';
import { Formik } from 'formik';
import './style.css';
import useProducts from '../../hooks/useProducts';

const Product = ({ history, location: { state } }) => {
  const { addProduct, editProduct } = useProducts();

  const onSubmit = async (values) => {
    try {
      if (values.id > 0) {
        await editProduct(values);
      } else {
        await addProduct(values);
      }
      history.push('/');
    } catch (error) {}
  };

  const validate = (values) => {
    const error = {};
    if (!values.productName) {
      error.productName = 'Required...';
    }
    if (values.productPrice <= 0) {
      error.productPrice = 'Required...';
    }
    if (values.quantities <= 0) {
      error.quantities = 'Required...';
    }
    if (!values.productType) {
      error.productType = 'Required...';
    }
    return error;
  };

  return (
    <div>
      <h1>{state?.product ? 'Edit Product' : 'Add Product'}</h1>
      <Formik
        initialValues={
          state?.product || {
            id: 0,
            productName: '',
            productPrice: 0,
            currency: 'INR',
            quantities: 0,
            productType: '',
          }
        }
        onSubmit={onSubmit}
        validate={validate}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-input">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productName && errors.productName && (
                <span className="error">{errors.productName}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="productPrice">Product Price</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                value={values.productPrice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.productPrice && errors.productPrice && (
                <span className="error">{errors.productPrice}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="quantities">Quantities</label>
              <input
                type="number"
                id="quantities"
                name="quantities"
                value={values.quantities}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.quantities && errors.quantities && (
                <span className="error">{errors.quantities}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="productType">Product Type</label>
              <select
                name="productType"
                id="productType"
                value={values.productType}
                onChange={handleChange}
                onBlur={handleBlur}>
                <option value="">Select Option</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="Laptop">Laptop</option>
              </select>
              {touched.productType && errors.productType && (
                <span className="error">{errors.productType}</span>
              )}
            </div>
            <button type="submit">Add Product</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Product;
