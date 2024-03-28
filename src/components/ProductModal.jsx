import React, { useState } from 'react';
import Modal from "react-modal";

function ProductModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1);
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
    console.log(`Adding ${quantity} ${product.title}(s) to cart`);
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
          <button onClick={decreaseQuantity}> - </button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}> + </button>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Modal>
  );
}

export default ProductModal;
