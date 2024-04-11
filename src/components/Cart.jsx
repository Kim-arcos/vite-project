import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(data => {
              if (data && data.products) {
                  const items = data.products.map((product) => ({
                      ...product,                  
                      quantity: product.quantity,
                  }));
                  setCartItems(items);
              }
          })
          .catch(error => {
              console.error('Error fetching cart items:', error);
          });
  }, []);
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItemToCart = (item) => {
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
          setCartItems(
              cartItems.map(cartItem =>
                  cartItem.id === item.id
                      ? { ...cartItem, quantity: cartItem.quantity + 1 }
                      : cartItem
              )
          );
      } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
};
    
const updateCartItemQuantity = (itemId, newQuantity) => {
  setCartItems(
      cartItems.map(item =>
          item.id === itemId
              ? { ...item, quantity: newQuantity }
              : item
      )
  );
};

const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const handleCheckout = () => {
  setCartItems([]);
  alert('Checkout successful!');
};
  
      return (
        <div>
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
            {cartItems.map((item) => (
                <li key={item.id}> 
                    {item.title} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                    />
                </li>
            ))}
        </ul>
          )}
          <p>Total: ${total}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      );
    }

export default Cart;
