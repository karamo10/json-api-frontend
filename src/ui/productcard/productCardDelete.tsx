import type { Product } from '../../types/product-data';

export default function ProductCardDeleteItem({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: () => void;
}) {
  return (
    <div className="product-card">
      <h2>Name: {product.name}</h2>
      <p>Price: GMD {product.price}</p>
      <p>Description: {product.description}</p>
      <p>In Stock: {product.instock ? 'true' : 'false'}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
