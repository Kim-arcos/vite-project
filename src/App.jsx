import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Account from './components/Account';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={ProductList} />
      <Route path="/products/:id" component={ProductDetails} />
      <Route path="/account" component={Account} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
    </Router>
  );
}

export default App;