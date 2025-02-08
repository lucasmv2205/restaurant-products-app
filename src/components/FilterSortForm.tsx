import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface FilterSortFormProps {
  filter: { sortBy: string; search: string };
  handleFilterChange: (e: any) => void;
}

const FilterSortForm: React.FC<FilterSortFormProps> = ({
  filter,
  handleFilterChange,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState(filter.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleFilterChange({ target: { name: "search", value: searchTerm } });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, handleFilterChange]);

  return (
    <Box
      mb={4}
      sx={{
        backgroundColor: theme.palette.gray[2],
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          marginBottom: "16px",
          marginTop: { xs: 0, sm: "8px" },
        }}
      >
        Filter & Sort Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <InputLabel
              htmlFor="sort-by-select"
              sx={{ color: theme.palette.primary.main }}
            >
              Sort By
            </InputLabel>
            <Select
              id="sort-by-select"
              name="sortBy"
              data-testid="sort-by-select"
              value={filter.sortBy}
              onChange={handleFilterChange}
              sx={{
                borderRadius: "8px",
                "& .MuiSelect-root": {
                  color: theme.palette.darkGray[0],
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.light,
                },
              }}
              endAdornment={
                filter.sortBy && (
                  <InputAdornment position="end">
                    <IconButton
                      data-testid="clear-sort-by"
                      size="small"
                      onClick={() =>
                        handleFilterChange({
                          target: { name: "sortBy", value: "" },
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="available">Availability</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            label="Search by name"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                color: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.light,
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSortForm;
