import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import useProducts from "../hooks/useProducts";

const ManageProductsPage: React.FC = () => {
  const { products, addProduct, deleteProduct } = useProducts({
    sortBy: "",
    search: "",
  });
  const [newProduct, setNewProduct] = useState({ name: "", available: true });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) {
      setError("Product name is required!");
      return;
    }

    addProduct(newProduct);
    setNewProduct({ name: "", available: true });
    setError("");
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <Container>
      <ProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
      />
      {error && <Typography color="error">{error}</Typography>}
      <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
      />
    </Container>
  );
};

export default ManageProductsPage;
