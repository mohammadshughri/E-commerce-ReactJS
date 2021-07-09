import React from "react";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";

// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';
// Rather than importing the specific location of the file we can import the methods that we need directly

import { Products, Navbar } from "./components";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCartHandler = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  //console.log(products);
  console.log(cart);
  return (
    <div>
      <Navbar totalItems={cart.total_Items} />
      <Products products={products} onAddToCart={addToCartHandler} />
    </div>
  );
};

export default App;
