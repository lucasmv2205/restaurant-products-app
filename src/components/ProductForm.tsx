import React from "react";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";

interface ProductFormProps {
  newProduct: { name: string; available: boolean };
  handleInputChange: (e: any) => void;
  handleAddProduct: () => void;
  error?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  handleInputChange,
  handleAddProduct,
  error,
}) => {
  const theme = useTheme();
  return (
    <Box
      mb={4}
      sx={{
        backgroundColor: theme.palette.gray[2],
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          Add New Product
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
        >
          <Box display="flex" alignItems="baseline" gap={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <TextField
                label="Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputLabel-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              {error && (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.white,
                padding: "12px 24px",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                minWidth: "160px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              type="submit"
            >
              Add Product
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ProductForm;
