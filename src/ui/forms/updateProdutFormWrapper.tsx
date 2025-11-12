// src/ui/forms/UpdateProdutFormWrapper.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UpdateProdutForm from './updateForm';
import { getProductById } from '../../services/api';
import type { Product } from '../../types/product-data';

export default function UpdateProdutFormWrapper() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return <UpdateProdutForm product={product} />;
}
