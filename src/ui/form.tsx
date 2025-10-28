import React, { useState, type ChangeEvent } from 'react';

type Product = {
  name: string;
  price: number;
};

export default function Form() {
  const [name, setName] = useState<string>('');
  const [price, setprice] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [responseData, setResponseData] = useState<Product | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = { name, price: Number(price) }; // Takes the values from the form and builds an object.

    try {
      const res = await fetch(`http://localhost:8000/api/product`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      setMessage(data.message || 'Product sent successfully');
      setResponseData(data.data);
      setName('');
      setprice('');
    } catch (err) {
      console.error(err);
      setMessage('Error sending message');
    }
  };

  return (
    <div>
      <h1>Send Product (JSON)</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="price"></label>
          <input
            type="number"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setprice(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">Send</button>

        {message && <p>{message}</p>}
          </form>
          <div>
              <h1>
                  Product Recieved
              </h1>
              <p>Name:{responseData?.name}</p>
              <br />
              <p>Price GMD{responseData?.price}</p>
          </div>
    </div>
  );
}
