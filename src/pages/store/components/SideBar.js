import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByCategory } from "../../../redux/features/slices/productsSlice";

export default function SideBar() {
  const categories = ["sneakers", "boots"];
  const dispatch = useDispatch();
  return (
    <div className=" sticky top-[120px] ml-10 flex  flex-col bg-white p-20">
      <div className="sticky top-[120px]">
        <div className=" py-5">
          <h2 className="text-bold text-xl text-gray-900">Categories</h2>
        </div>
        <div className="flex flex-col py-10">
          {categories.map((category, index) => (
            <Link
              className=" text-md py-2 text-gray-700"
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
