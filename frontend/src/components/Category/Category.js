import React, { useState, useEffect } from "react";
import CSS from "./Category.module.css";
import CategoryFilterCard from "./CategorySection/CategoryFilterCard";
import CategoryProductCard from "./CategoryProductsSection/CategoryProductCard";
import axios from "axios";
import { backedUrl } from "../../apiUrl";
import { useLocation } from "react-router-dom";

const Category = () => {

  const userToken = localStorage.getItem('token');

  const [filterItems, setFilterItems] = useState([]);
  const [filterState, setFilterState] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState({ Min: 0, Max: 0 });
  const location = useLocation()
  let searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1783/api/getproduct", { headers: { "Authorization": `Bearer ${userToken}` } })
      .then((res) => {
        const sortedProducts = res.data.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        setProducts(sortedProducts);
        setFilterItems(sortedProducts);
      })
      .catch((err) => console.error(err));
    if (category)
      handleFilterCategory(category)
  }, []);

  const handleFilterCategory = async (categoryFilter) => {
    setFilterState(false);
    setCategoryFilter(categoryFilter);
    let { data } = await axios.get(`${backedUrl}/api/filterbycategory/${categoryFilter}`, { headers: { "Authorization": `Bearer ${userToken}` } })
    console.log("data", data.data)
    setProducts(data.data)
    applyFilters(categoryFilter, priceFilter.Min, priceFilter.Max);
  };

  const hanldeFilterPrice = (priceMin, priceMax) => {
    setFilterState(false);
    setPriceFilter(priceFilter);
    applyFilters(categoryFilter, priceMin, priceMax);
  };

  const applyFilters = (category, priceMin, priceMax) => {
    let filteredItems = [...products];
  
    // Apply category filter
    if (category !== "All") {
      filteredItems = filteredItems.filter((item) =>
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
  
    // Apply price filter
    if (priceMin !== null && priceMin !== undefined && priceMax !== null && priceMax !== undefined) {
      filteredItems = filteredItems.filter(
        (item) =>
          (priceMin === 0 || item.newPrice >= priceMin) &&
          (priceMax === 0 || item.newPrice <= priceMax)
      );
    } else if (priceMin !== null && priceMin !== undefined) {
      filteredItems = filteredItems.filter((item) => item.newPrice >= priceMin);
    } else if (priceMax !== null && priceMax !== undefined) {
      filteredItems = filteredItems.filter((item) => item.newPrice <= priceMax);
    }
    
    setFilterItems(filteredItems);
  };
  

  return (
    <div className={`${CSS["grid-container"]} container`}>
      <div className={CSS["category-filter"]}>
        <CategoryFilterCard
          filterCategory={handleFilterCategory}
          filterprice={hanldeFilterPrice}
          categoryFilter={categoryFilter}
        />
      </div>
      <div className={CSS["product"]}>
        <CategoryProductCard ItemList={filterItems} />
      </div>
    </div>
  );
};

export default Category;
