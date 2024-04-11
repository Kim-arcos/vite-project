import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const addToCart = (product, quantity = 1) => {
    console.log("Adding to cart:", product);
    
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      const cartItem = {
        ...product,
        quantity,
      };
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }
    
    console.log("Cart items after adding:", cartItems);
  };

  return (
    <div className="product-list"> 
      {products.map((product) => (
        <div key={product.id} className="product-card"> 
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <img
            src={product.image}
            alt={product.title}
          />
          <button onClick={() => openModal(product)}>View Details</button>
          <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
        </div>
      ))}
      <ProductModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        product={selectedProduct}
        setCartItems={setCartItems}
        addToCart={addToCart}
      />
    </div>
  );
}

export default ProductList;