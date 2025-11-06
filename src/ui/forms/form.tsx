import React, { useState, type ChangeEvent } from 'react';
import { createProduct } from '../../services/api';
import type { Product, NewProduct } from '../../types/product-data';

export default function Form() {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [instock, setInstock] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [responseData, setResponseData] = useState<Product | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product: NewProduct = {
      name,
      price: Number(price),
      description,
      instock,
    };

    try {
      const newProduct = await createProduct(product);
      setResponseData(newProduct);
      setMessage('Product successfully created!');
      setName('');
      setPrice('');
      setDescription('');
      setInstock(true);
    } catch (err: any) {
      console.error(err);
      setMessage(`${err.message || 'Error sending data'}`);
    }

    // const product: Product = {
    //   name,
    //   price: Number(price),
    //   description,
    //   instock,
    // }; // Takes the values from the form and builds an object.

    // try {
    //   const res = await fetch(`http://localhost:8000/api/product`, {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //     body: JSON.stringify(product),
    //   });

    //   const data = await res.json();
    //   setMessage(data.message || 'Product sent successfully');
    //   setResponseData(data.product);
    //   setName('');
    //   setPrice('');
    //   setDescription('');
    //   setInstock(true);
    // } catch (err) {
    //   console.error(err);
    //   setMessage('Error sending message');
    // }
  };

  return (
    <div className="form-container">
      <h1>Create Product</h1>
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

        <button type="submit">Send</button>
        {message && <p>{message}</p>}
      </form>
      <div>
        <h1>Product Recieved</h1>
        {responseData && (
          <div>
            <p>Name: {responseData.name}</p>
            <p>Price: {responseData.price}</p>
            <p>Description: {responseData.description}</p>
            <p>In Stock: {responseData.instock ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
