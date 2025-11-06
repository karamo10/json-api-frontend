import type { Product } from '../../types/product-data';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <h2>Name: {product.name}</h2>
      <p>Price: GMD {product.price}</p>
      <p>Description: {product.description}</p>
      <p>In Stock: {product.instock ? 'true' : 'false'}</p>
    </div>
  );
}
