import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const API_URL = "https://fakestoreapi.com";
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
  };

  return (
    <div className="product-list"> 
      {products.map((product) => (
        <div key={product.id} className="product-card"> 
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <img
            src={product.image}
            alt={product.title}
          />
          <button onClick={() => openModal(product)}>View Details</button>
        </div>
      ))}
      <ProductModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        product={selectedProduct}
        addToCart={addToCart}
      />
    </div>
  );
}

export default ProductList;