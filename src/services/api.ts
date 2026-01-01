// This file centralizes all API calls and handles environment switching.
import type { Product, NewProduct } from '../types/product-data';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('API URL', API_URL);

export async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) throw new Error(`API error ${res.status} ${res.statusText}`);

  return res.json();
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
 return request('/api/product');
}

// Get one product by it slug
export async function getProductBySlug(slug: string): Promise<Product> {
  return request(`/api/product/${slug}`);
}

// Get one product by it id
export async function getProductById(id: number): Promise<Product> {
  return request(`/api/product/${id}`);
}

// Create new product
// API function about sending data and it expects raw JS object
export async function createProduct(payload: NewProduct): Promise<{message: string}> {
  const res = await request(`/api/product`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return res;
}

// // Update product
export async function updateProduct(
  id: number,
  product: Partial<NewProduct>
): Promise<{message: string}> {
  const res = await request(`/api/product/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(product),
  });

  return res;
}

// delete product
export async function deleteProduct(id: number) {
  const res = await request(`/api/products/${id}`, {
   method: 'DELETE',
  })
  
  if (!res.ok) {
    throw new Error('Failed to delete product');
  }

  return res.json();
}
