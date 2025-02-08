import React from "react";
import { Snackbar, Alert, useTheme } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  type: "creation" | "deletion";
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  type,
  onClose,
}) => {
  const theme = useTheme();
  const backgroundColor =
    type === "creation" ? theme.palette.green[0] : theme.palette.primary.main;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        sx={{
          backgroundColor,
          color: theme.palette.white,
          fontWeight: "bold",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
