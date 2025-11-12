import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';
import ProductCardEdit from '../ui/productcard/productCardEdit';
import type { Product } from '../types/product-data';
import { toast } from 'react-toastify';

export default function ProductsAdminList() {
 const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err: any) {
        toast.error('Something went wrong while fetching products.')
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className='loading'>Loading products...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCardEdit key={product.id} product={product} />
      ))}
    </div>
  );
}
