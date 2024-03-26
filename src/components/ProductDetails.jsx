import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from './api'; 

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductDetails(id); 
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    fetchData();
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
      <img src={product.image} alt={product.title} style={{ maxWidth: '300px' }} />
    </div>
  );
}

export default ProductDetails;