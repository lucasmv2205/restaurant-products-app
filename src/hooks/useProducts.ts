import { useState, useEffect } from 'react';
import axios from 'axios';
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
      console.error('Error fetching products:', error.response?.data || error.message);
    }
  };

  const addProduct = (newProduct: NewProduct) => {
    api.post('/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
      });
  };

  const deleteProduct = (id: number) => {
    api.delete(`/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  return {
    products,
    filters,
    setFilters,
    addProduct,
    deleteProduct,
  };
};

export default useProducts;