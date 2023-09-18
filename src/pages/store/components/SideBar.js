import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filterByCategory } from "../../../redux/features/slices/productsSlice";
import { AiOutlineDown } from "react-icons/ai";
import data from "../../../data/data.json";

export default function SideBar() {
  const [showMenCategories, setShowMenCategories] = useState("closed");
  const [showWomenCategories, setShowWomenCategories] = useState("closed");

  const dispatch = useDispatch();

  const categoriesData = data.products.map((product) => product.category);
  const categories = [...new Set(categoriesData)];

  const genders = ["male", "female"];

  return (
    <div className=" sticky top-[120px] ml-10 flex  flex-col bg-white p-20">
      <div className="sticky top-[120px]">
        <div className=" py-5">
          <h2 className="text-bold text-xl text-gray-900">Categories</h2>
        </div>

        {/* men categories */}
        <div className="my-5">
          <button
            className=" flex flex-row items-center text-lg"
            onClick={() =>
              showMenCategories === "closed"
                ? setShowMenCategories("open")
                : setShowMenCategories("closed")
            }
          >
            Men
            <span className="mx-2">
              <AiOutlineDown />
            </span>
          </button>
          <div
            className={
              showMenCategories === "closed"
                ? "hidden"
                : "ml-3 flex flex-col py-4"
            }
          >
            {categories.map((category, index) => (
              <Link
                className=" text-md my-1 text-gray-700"
                onClick={() =>
                  dispatch(
                    filterByCategory([
                      category.toLowerCase(),
                      genders[0].toLowerCase(),
                    ]),
                  )
                }
                key={index}
                to={`${category}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* women categories */}
        <div className="my-5">
          <button
            className=" flex flex-row items-center text-lg"
            onClick={() =>
              showWomenCategories === "closed"
                ? setShowWomenCategories("open")
                : setShowWomenCategories("closed")
            }
          >
            Women
            <span className="mx-2">
              <AiOutlineDown />
            </span>
          </button>
          <div
            className={
              showWomenCategories === "closed"
                ? "hidden"
                : "ml-3 flex flex-col py-4"
            }
          >
            {categories.map((category, index) => (
              <Link
                className=" text-md my-1 text-gray-700"
                onClick={() =>
                  dispatch(
                    filterByCategory([
                      category.toLowerCase(),
                      genders[1].toLowerCase(),
                    ]),
                  )
                }
                key={index}
                to={`${category}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
