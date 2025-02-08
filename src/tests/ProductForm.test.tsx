import { ThemeProvider } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { render, screen, fireEvent } from "@testing-library/react";
import theme from "../styles/theme";

describe("ProductForm", () => {
  let mockHandleInputChange: jest.Mock;
  let mockHandleAddProduct: jest.Mock;
  let newProduct: { name: string; available: boolean };

  beforeEach(() => {
    mockHandleInputChange = jest.fn();
    mockHandleAddProduct = jest.fn();
    newProduct = { name: "", available: false };
  });

  test("renders input and button correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductForm
          newProduct={newProduct}
          handleInputChange={mockHandleInputChange}
          handleAddProduct={mockHandleAddProduct}
        />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Product/i })
    ).toBeInTheDocument();
  });

  test("calls handleAddProduct when button is clicked with valid input", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductForm
          newProduct={{ name: "Test Product", available: false }}
          handleInputChange={mockHandleInputChange}
          handleAddProduct={mockHandleAddProduct}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));

    expect(mockHandleAddProduct).toHaveBeenCalledTimes(1);
  });

  test("does not submit form when input is empty", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProductForm
          newProduct={{ name: "", available: false }}
          handleInputChange={mockHandleInputChange}
          handleAddProduct={mockHandleAddProduct}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add Product/i }));

    expect(mockHandleAddProduct).not.toHaveBeenCalled();
  });
});
