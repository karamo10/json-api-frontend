import { useNavigate } from "react-router-dom";
import type { Product } from '../../types/product-data';

export default function ProductCardEdit({ product }: { product: Product }) {
  const navigate = useNavigate()

  return (
    <div className="product-card">
      <h2>Name: {product.name}</h2>
      <p>Price: GMD {product.price}</p>
      <p>Description: {product.description}</p>
      <p>In Stock: {product.instock ? 'true' : 'false'}</p>
       <button
        onClick={() => navigate(`/product/${product.id}/edit`)}
      >
        Edit
      </button>
    </div>
  );
}
