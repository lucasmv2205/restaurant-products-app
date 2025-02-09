import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import useProducts from "../hooks/useProducts";
import ConfirmationDialog from "../components/ConfirmationDialog";
import CustomSnackbar from "../components/CustomSnackBar";
import EditProductModal from "../components/EditProductModal";

interface Product {
  id: number;
  name: string;
  available: boolean;
}

const ManageProductsPage: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useProducts({
    sortBy: "",
    search: "",
  });
  const [newProduct, setNewProduct] = useState({ name: "", available: true });
  const [error, setError] = useState<string>("");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"creation" | "deletion">(
    "creation"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);

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

    setSnackbarMessage("Product successfully added!");
    setSnackbarType("creation");
    setSnackbarOpen(true);
  };

  const handleConfirmDelete = (id: number) => {
    setProductToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleDeleteConfirmed = () => {
    if (productToDelete !== null) {
      deleteProduct(productToDelete);

      setSnackbarMessage("Product successfully deleted!");
      setSnackbarType("deletion");
      setSnackbarOpen(true);
    }
    setOpenConfirmDialog(false);
    setProductToDelete(null);
  };

  const handleOpenEditProductModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleSaveProductChanges = async (updatedProduct: {
    name: string;
    available: boolean;
  }) => {
    if (selectedProduct) {
      try {
        const response = await updateProduct(
          selectedProduct.id,
          updatedProduct
        );

        if (response) {
          setSnackbarMessage("Product successfully updated!");
          setSnackbarType("creation");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("Failed to update product. Please try again.");
          setSnackbarType("deletion");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarMessage("There was an error updating the product.");
        setSnackbarType("deletion");
        setSnackbarOpen(true);
        console.error("Error:", error);
      }
    }

    setOpenEditModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        error={error}
      />
      <ProductTable
        products={products}
        showActions
        handleDeleteProduct={handleConfirmDelete}
        handleOpenEditProductModal={handleOpenEditProductModal}
      />
      <ConfirmationDialog
        open={openConfirmDialog}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleDeleteConfirmed}
      />

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />

      <EditProductModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        product={selectedProduct}
        onSave={handleSaveProductChanges}
      />
    </>
  );
};

export default ManageProductsPage;
