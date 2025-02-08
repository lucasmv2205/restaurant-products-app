import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Switch,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: { name: string; available: boolean } | null;
  onSave: (data: { name: string; available: boolean }) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  product,
  onSave,
}) => {
  const theme = useTheme();
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    available: boolean;
  }>();

  const handleSave = (data: { name: string; available: boolean }) => {
    onSave(data);
    closeForm();
  };

  const closeForm = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-product-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Typography
          id="edit-product-modal"
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: 2,
            textAlign: "center",
            width: "100%",
          }}
        >
          Edit Product
        </Typography>

        <form onSubmit={handleSubmit(handleSave)} style={{ width: "100%" }}>
          <TextField
            label="Product Name"
            defaultValue={product?.name}
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                fontSize: "16px",
              },
            }}
            {...register("name")}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.primary.main }}
            >
              Available:
            </Typography>
            <Switch
              defaultChecked={product?.available || false}
              {...register("available")}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: theme.palette.primary.main,
                },
                "& .MuiSwitch-track": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              onClick={closeForm}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.white,
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Close
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.black,
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
