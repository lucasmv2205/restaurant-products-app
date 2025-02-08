import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { api } from '../services/api';

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface NewProduct {
  name: string;
  available: boolean;
}

interface Filters {
  sortBy: string;
  search: string;
}

const useProducts = (initialFilters: Filters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error fetching products:", err.response?.data || err.message);
    }
  };

  const addProduct = async (newProduct: NewProduct) => {
    try {
      const response = await api.post('/products', newProduct);
      setProducts([...products, response.data]);
      return response.data;
    } catch (error) {
      console.error('There was an error adding the product!', error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      return response;
    } catch (error) {
      console.error('There was an error deleting the product!', error);
      throw error;
    }
  };

  const updateProduct = async (id: number, updatedProduct: Partial<NewProduct>) => {
    try {
      const response = await api.put(`/products/${id}`, updatedProduct);
      setProducts(products.map(product =>
        product.id === id ? { ...product, ...response.data } : product
      ));
      return response.data;
    } catch (error) {
      console.error('There was an error updating the product!', error);
      throw error;
    }
  };

  return {
    products,
    filters,
    setFilters,
    addProduct,
    deleteProduct,
    updateProduct,
  };
};

export default useProducts;