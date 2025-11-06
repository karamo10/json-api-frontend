import { useEffect, useState } from 'react';
import ProductCard from '../productcard/productCard';
import type { Product } from '../../types/product-data';
import { getAllProducts } from '../../services/api';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
          setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className='loading'>Loading...</p>;

  return (
    <div className='product-container'>
      <h1>All Products</h1>
      <div className='product-card-container'>
        {products.map((product) => (
          <div>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
      <p>Error {error}</p>
    </div>
  );
}
