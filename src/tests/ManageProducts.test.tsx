import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManageProductsPage from "../pages/ManageProductsPage";
import useProducts from "../hooks/useProducts";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

jest.mock("../hooks/useProducts");

describe("ManageProductsPage", () => {
  let mockAddProduct: jest.Mock;
  let mockDeleteProduct: jest.Mock;

  beforeEach(() => {
    mockAddProduct = jest.fn();
    mockDeleteProduct = jest.fn();

    (useProducts as jest.Mock).mockReturnValue({
      products: [
        { id: 1, name: "Product A", available: true },
        { id: 2, name: "Product B", available: false },
      ],
      addProduct: mockAddProduct,
      deleteProduct: mockDeleteProduct,
    });
  });

  test("renders ProductForm and ProductTable", () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  test("adds a new product successfully", () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    const input = screen.getByLabelText(/Product Name/i);
    const button = screen.getByRole("button", { name: /Add Product/i });

    fireEvent.change(input, { target: { value: "New Product" } });
    fireEvent.click(button);

    expect(mockAddProduct).toHaveBeenCalledWith({
      name: "New Product",
      available: true,
    });
  });

  test("does not add product if name is empty", () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));

    expect(mockAddProduct).not.toHaveBeenCalled();
  });

  test("opens confirmation dialog when trying to delete a product", () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    fireEvent.click(deleteButtons[1]);

    expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument();
  });

  test("deletes product after confirmation", async () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]);

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() => expect(mockDeleteProduct).toHaveBeenCalledWith(2));
    expect(
      screen.getByText(/Product successfully deleted!/i)
    ).toBeInTheDocument();
  });

  test("cancels product deletion", () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockDeleteProduct).not.toHaveBeenCalled();
  });

  test("snackbar appears on successful deletion", async () => {
    render(
      <ThemeProvider theme={theme}>
        <ManageProductsPage />
      </ThemeProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]);

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Product successfully deleted!/i)
      ).toBeInTheDocument()
    );
  });
});
