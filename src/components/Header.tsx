import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box, useTheme } from "@mui/material";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap={"wrap"}
      mb={4}
      mt={2}
      sx={{
        backgroundColor: theme.palette.secondary.main,
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: theme.palette.darkGray[0] }}
      >
        Products
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Button
          component={Link}
          to="/"
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
        >
          Product List
        </Button>
        <Button
          component={Link}
          to="/manage"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.darkGray[0],
            padding: "12px 24px",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            minWidth: "160px",
            "&:hover": {
              backgroundColor: theme.palette.orange[0],
            },
          }}
        >
          Manage Products
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
