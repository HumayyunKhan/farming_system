import React, { useEffect, useState } from "react";
import CSS from "./TrendingProduct.module.css";
import TrendingCard from "./TrendingCard/TrendingCard"
import axios from "axios";

const TrendingProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1783/api/getproduct")
      .then((res) => {
        const sortedProducts = res.data.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        setProducts(sortedProducts.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className={CSS["trending-products-div"]}>
        <p className={CSS["trending-products-title"]}>Trending Products</p>
      </div>
      {products.map((item) => (
        <TrendingCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default TrendingProduct;
