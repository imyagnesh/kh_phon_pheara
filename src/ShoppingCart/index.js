import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductList from './screens/ProductList';
import Product from './screens/Product';

const index = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/create-product" component={Product} />
        </Switch>
      </div>
    </Router>
  );
};

export default index;
