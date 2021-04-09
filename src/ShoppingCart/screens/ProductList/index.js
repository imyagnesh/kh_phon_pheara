import React, { useEffect } from 'react';
import useProducts from '../../hooks/useProducts';

const ShoppingCart = ({ history }) => {
  const {
    fetchProducts,
    products: { isFetching, fetchError, products },
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  if (fetchError) {
    return <h1>{fetchError.message}</h1>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <button type="button" onClick={() => history.push('/create-product')}>
        Add New Product
      </button>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Type</th>
            <th>Quantities</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{`${product.productPrice} ${product.currency}`}</td>
              <td>{product.productType}</td>
              <td>{product.quantities}</td>
              <td>
                <div>
                  <button type="button" onClick={() => history.push('/create-product', {
                    product
                  })}>Edit</button>
                  <button type="button" onClick={() => {}}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ShoppingCart.propTypes = {};

export default ShoppingCart;
