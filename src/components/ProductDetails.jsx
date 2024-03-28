import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductDetails(productId) {
      const API_URL = 'https://fakestoreapi.com';
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    fetchProductDetails(id);
}, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} />
    </div>
  );
}

export default ProductDetails;