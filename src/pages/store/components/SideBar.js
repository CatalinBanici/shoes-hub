import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByCategory } from "../../../redux/features/slices/productsSlice";

export default function SideBar() {
  const categories = ["sneakers", "boots"];
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2>Categories</h2>
      </div>
      <div>
        <div>
          {categories.map((category, index) => (
            <Link
              onClick={() => dispatch(filterByCategory(category))}
              key={index}
              to={`${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
