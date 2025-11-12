import { useParams } from 'react-router-dom';
import type { Product } from '../types/product-data';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const IdNum = Number(id);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(IdNum);
        setProduct(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <div className="product-card">
      <h2>Name: {product.name}</h2>
      <p>Price: GMD {product.price}</p>
      <p>Description: {product.description}</p>
      <p>In Stock: {product.instock ? 'true' : 'false'}</p>
    </div>
  );
}

export default ProductPage;
