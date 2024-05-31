import React, { useState, useEffect } from "react";
import CSS from "./CategorySection.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1783/api/getcategory")
      .then((res) => {
        const sortedCategory = res.data.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );
        setCategories(sortedCategory);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container">
      <h3 className={CSS["category-title"]}>Categories</h3>
      {categories.map((category, index) => (
        <div key={category._id} className={CSS["category-container"]}>
          <Link className={CSS["category-link"]} to={`/category/?category=${category.categoryName}`} key={index}>
            <div className={CSS["category-data"]} key={index}>
              <h6 className={CSS["category-subtitle"]}>
                {category.categoryName}
              </h6>
              <img
                className={CSS["category-img"]}
                src={`http://localhost:1783/Images/${category.categoryImage}`}
                alt={category.categoryName}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
