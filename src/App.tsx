import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ListProductsPage from "./pages/ListProductsPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<ListProductsPage />} />
          <Route path="/manage" element={<ManageProductsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
