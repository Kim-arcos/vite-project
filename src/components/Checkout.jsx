import React, { useState } from 'react';


function Checkout({ cartItems, setCartItems }) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCartItems([]);
    alert('Checkout successful!');
  };

  
  return (
    <div>
      <h2>Checkout</h2>
      <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                    </li>
                ))}
            </ul>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={handleCheckout}>Confirm Checkout</button>
        </div>
    );
}

export default Checkout;