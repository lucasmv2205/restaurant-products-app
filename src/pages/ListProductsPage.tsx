import React from "react";
import FilterSortForm from "../components/FilterSortForm";
import ProductTable from "../components/ProductTable";
import useProducts from "../hooks/useProducts";

const ListProductsPage: React.FC = () => {
  const { products, filters, setFilters } = useProducts({
    sortBy: "",
    search: "",
  });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <FilterSortForm
        filter={filters}
        handleFilterChange={handleFilterChange}
      />
      <ProductTable products={products} />
    </>
  );
};

export default ListProductsPage;
