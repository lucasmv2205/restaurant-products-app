import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface ProductTableProps {
  products: Product[];
  handleDeleteProduct?: (id: number) => void;
  handleOpenEditProductModal?: (product: Product) => void;
  showActions?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDeleteProduct,
  handleOpenEditProductModal,
  showActions = false,
}) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.secondary.main }}>
            <TableCell
              sx={{ fontWeight: "bold", color: theme.palette.darkGray[0] }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: theme.palette.darkGray[0] }}
            >
              Available
            </TableCell>
            {showActions && (
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.darkGray[0],
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const isDeletable = !product.available;

            return (
              <TableRow key={product.id} hover>
                <TableCell sx={{ color: theme.palette.darkGray[0] }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ color: theme.palette.darkGray[0] }}>
                  {product.available ? "Yes" : "No"}
                </TableCell>
                {showActions && (
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Tooltip
                      title={
                        !isDeletable ? "Cannot delete an available product" : ""
                      }
                      arrow
                    >
                      <span>
                        <Button
                          variant="contained"
                          startIcon={<DeleteOutlineIcon />}
                          onClick={() =>
                            handleDeleteProduct &&
                            handleDeleteProduct(product.id)
                          }
                          disabled={!isDeletable}
                          sx={{
                            backgroundColor: isDeletable
                              ? theme.palette.primary.main
                              : theme.palette.gray[0],
                            color: theme.palette.white,
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: "bold",
                            padding: "6px 12px",
                            transition: "0.3s",
                            "&:hover": {
                              backgroundColor: isDeletable
                                ? theme.palette.primary.light
                                : theme.palette.gray[0],
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </span>
                    </Tooltip>
                    <Button
                      onClick={() =>
                        handleOpenEditProductModal &&
                        handleOpenEditProductModal(product)
                      }
                      variant="contained"
                      startIcon={<EditIcon />}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.darkGray[0],
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: "bold",
                        padding: "6px 12px",
                        transition: "0.3s",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.contrastText,
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
