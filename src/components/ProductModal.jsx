import React, { useState } from 'react';
import Modal from "react-modal";

function ProductModal({ isOpen, onClose, product, setCartItems, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return null;
  }

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity 
    };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">{product.title}</h2>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <img src={product.image} alt={product.title} />
      </div>
      <div className="modal-actions">
        <div className="quantity-controls">
        <button onClick={decreaseQuantity} disabled={quantity <= 1}> - </button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}> + </button>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
        {addedToCart && <p>Item added to cart</p>}
      </div>
    </Modal>
  );
}

export default ProductModal;
