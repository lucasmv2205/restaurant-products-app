import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSortForm from "../components/FilterSortForm";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

describe("FilterSortForm Component", () => {
  let filter: { sortBy: string; search: string };
  let handleFilterChange: jest.Mock;

  beforeEach(() => {
    filter = { sortBy: "", search: "" };
    handleFilterChange = jest.fn();
  });

  test("renders the component correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <FilterSortForm
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Filter & Sort Products")).toBeInTheDocument();
    expect(screen.getByTestId("sort-by-select")).toBeInTheDocument();
    expect(screen.getByLabelText("Search by name")).toBeInTheDocument();
  });

  test("updates the search field when text is entered", async () => {
    const handleFilterChange = jest.fn();
    const filter = { sortBy: "", search: "" };

    render(
      <ThemeProvider theme={theme}>
        <FilterSortForm
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      </ThemeProvider>
    );

    const input = screen.getByLabelText("Search by name") as HTMLInputElement;
    await userEvent.type(input, "Test Product");

    await waitFor(() => {
      expect(handleFilterChange).toHaveBeenCalled();
    });
    expect(handleFilterChange).toHaveBeenCalledTimes(1);
    expect(handleFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "search",
          value: "Test Product",
        }),
      })
    );
  });

  test("clears the sortBy field when the clear button is clicked", () => {
    filter.sortBy = "name";
    render(
      <ThemeProvider theme={theme}>
        <FilterSortForm
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      </ThemeProvider>
    );

    const clearButton = screen.getByTestId("clear-sort-by");
    fireEvent.click(clearButton);

    expect(handleFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { name: "sortBy", value: "" } })
    );
  });
});
