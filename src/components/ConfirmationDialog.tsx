import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title = "Confirm Action",
  message,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: theme.palette.gray[1],
          minWidth: "320px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.darkGray[0],
          fontWeight: "bold",
          textAlign: "center",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          padding: "12px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            color: theme.palette.darkGray[0],
            fontSize: "16px",
            textAlign: "center",
            padding: "12px",
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "center", gap: "8px", padding: "12px" }}
      >
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.darkGray[0],
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "6px 16px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.contrastText,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.white,
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "6px 16px",
            "&:hover": { backgroundColor: theme.palette.primary.light },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
