import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";
import useProductList from "../../hooks/useProductList";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");

  const { data, error, isFetching, hasNextPage, fetchNextPage } =
    useProductList({
      search: searchQuery,
      category,
      productsPerPage: 10,
    });

  const handlePageChange = (currentPage) => {
    const currentParams = Object.fromEntries([...search]);

    setSearch({
      ...currentParams,
      currentPage: parseInt(currentParams.currentPage) + 1,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isFetching &&
        hasNextPage &&
        data
      ) {
        // handlePageChange();
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isFetching]);

  useEffect(() => {
    if (data && data.pages) {
      const products = data.pages.flatMap((page) => page.products);

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <section className="products_list_section">
      <header className="align_center products_list_section">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}

        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {isFetching &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
    </section>
  );
};

export default ProductsList;
