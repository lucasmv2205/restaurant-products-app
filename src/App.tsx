import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Container, Typography, Button, Box, useTheme } from "@mui/material";
import ListProductsPage from "./pages/ListProductsPage";
import ManageProductsPage from "./pages/ManageProductsPage";

const App: React.FC = () => {
  const theme = useTheme();
  return (
    <Router>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
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
          <Box display="flex" gap={2}>
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
        <Routes>
          <Route path="/" element={<ListProductsPage />} />
          <Route path="/manage" element={<ManageProductsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
