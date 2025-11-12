import type { Product } from '../../types/product-data';
import ProductCardDeleteItem from '../productcard/productCardDelete';
import { getAllProducts, deleteProduct } from '../../services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ProductCardDelete() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [message, setMesage] = useState('');
  // const [error, setError] = useState<string | null>(null);

  async function fetchProduct() {
    try {
      const data = await getAllProducts();
      setProducts(data);
      toast.success('Product fetch successfully!')
    } catch (err: any) {
      toast.error('Something went wrong while fetching products.');
      console.error(err.message)
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await deleteProduct(id);
      toast.success(res.message);
      fetchProduct(); // // refresh list after delete
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  }

  // console.log(object);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductCardDeleteItem
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
}
