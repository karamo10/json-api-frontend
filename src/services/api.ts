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

// Create new product
export async function createProduct(product: NewProduct): Promise<Product> {
  const res = await request(`/api/product`, {
    method: 'POST',
    body: JSON.stringify(product),
  });

  return res.product;
}
