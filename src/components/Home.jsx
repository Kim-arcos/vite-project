import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="banner">
        <h1>Welcome to Our Store</h1>
        <h2>Explore our collection of products and find the perfect items for your needs</h2>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;