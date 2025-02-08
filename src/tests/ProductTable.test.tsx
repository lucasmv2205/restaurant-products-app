import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductTable from "../components/ProductTable";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

describe("ProductTable", () => {
  const mockDeleteProduct = jest.fn();

  const products = [
    { id: 1, name: "Product 1", available: true },
    { id: 2, name: "Product 2", available: false },
  ];

  test("should render table with products", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductTable products={products} showActions={false} />
      </ThemeProvider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  test("should display delete button and handle delete action", async () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductTable
          products={products}
          handleDeleteProduct={mockDeleteProduct}
          showActions={true}
        />
      </ThemeProvider>
    );

    const productRow1 = screen.getByText("Product 1").closest("tr");
    expect(productRow1?.querySelector("button")).toBeDisabled();

    const productRow2 = screen.getByText("Product 2").closest("tr");
    expect(productRow2?.querySelector("button")).toBeEnabled();

    const deleteButton2 = productRow2?.querySelector("button");
    fireEvent.click(deleteButton2!);

    expect(mockDeleteProduct).toHaveBeenCalledWith(2);
  });

  test("should disable delete button for available products", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductTable
          products={products}
          handleDeleteProduct={mockDeleteProduct}
          showActions={true}
        />
      </ThemeProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    expect(deleteButtons[0]).toBeDisabled();
  });
});
