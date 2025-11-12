// src/pages/ProductsList.tsx
import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';
import ProductCard from '../ui/productcard/productCard';
import type { Product } from '../types/product-data';
import {toast} from 'react-toastify'

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        toast.success('Product fetch successfully')
      } catch (err: any) {
        toast.error('Something went wrong while loading products.')
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-list-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
