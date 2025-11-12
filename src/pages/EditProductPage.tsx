// src/pages/EditProductPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import UpdateProdutForm from '../ui/forms/updateForm';
import type { Product } from '../types/product-data';
import { toast } from 'react-toastify';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const numericId = Number(id); // convert the id from string to number


  useEffect(() => {
    async function fetchProductById() {
      try {
        const data = await getProductById(numericId);
        setProduct(data);
        // toast.success('Product loaded successfully');
      } catch (err: any) {
        toast.error('Failed to load product');
        console.error(err.message);
      }
    }
    fetchProductById();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="p-6">
      <h1>Edit Product</h1>
      <UpdateProdutForm product={product} />
    </div>
  );
}
