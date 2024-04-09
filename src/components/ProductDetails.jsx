import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductModal from "./ProductModal";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProductDetails(productId) {
      const API_URL = "https://fakestoreapi.com";
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetails(id);
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    setShowMessage(true);
    console.log(`Added ${product.title} to cart`);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {product && (
        <>
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "100px" }}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
          {showMessage && <p>Item added to cart</p>}
          <ProductModal
            isOpen={modalIsOpen}
            onClose={closeModal}
            product={product}
            setCartItems={setCartItems}
            initialQuantity={quantity}
          />
        </>
      )}
    </div>
  );
}

export default ProductDetails;
