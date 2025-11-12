import { useState, type ChangeEvent } from 'react';
import { updateProduct } from '../../services/api';
import type { Product, NewProduct } from '../../types/product-data';
import { toast } from "react-toastify";

type UpdateFormProps = {
  product: Product;
};

export default function UpdateProdutForm({ product }: UpdateFormProps) {
  // console.log(product.description);
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<string>(String(product.price));
  const [description, setDescription] = useState<string>(
    product.description || ''
  );
  const [instock, setInstock] = useState<boolean>(product.instock ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: NewProduct = {
      name,
      price: Number(price),
      description,
      instock,
    };

    try {
    const res =   await updateProduct(product.id, updateData);
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.message || 'Error updating product');
      console.error(err.message)
    }
  };

  return (
    <div className="form-container">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            required
          ></textarea>
        </div>
        <div className="last-child">
          <label htmlFor="instock">Instock</label>
          <input
            className="check"
            type="checkbox"
            checked={instock}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInstock(e.target.checked)
            }
          />
        </div>

        <button type="submit">Update</button>
        {/* {message && <p>{message}</p>} */}
      </form>
    </div>
  );
}
