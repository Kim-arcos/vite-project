import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api'; 

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await fetchProducts(); 
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;