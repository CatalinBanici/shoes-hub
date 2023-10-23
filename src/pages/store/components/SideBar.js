// REACT
import { useState } from "react";

// REDUX
import { useDispatch } from "react-redux";
import {
  filterByCategoryMale,
  filterByCategoryFemale,
  resetFilterByColorAndSortByPrice,
} from "../../../redux/features/slices/productsSlice";

// REACT ROUTER
import { Link } from "react-router-dom";

// REACT ICONS
import { AiOutlineDown } from "react-icons/ai";

// DATA
import data from "../../../data/data.json";

export default function SideBar() {
  const dispatch = useDispatch();
  const [showMenCategories, setShowMenCategories] = useState("closed");
  const [showWomenCategories, setShowWomenCategories] = useState("closed");

  // getting the category type dynamically to be mapped in the categories section.
  // note: if one new category type is added inside the json data, it will automatically be renderd in the categories section
  const categoriesDataMale = data.products.map((product) => product.category);
  const categoriesMale = [...new Set(categoriesDataMale)];

  const categoriesDataFemale = data.products.map((product) => product.category);
  const categoriesFemale = [...new Set(categoriesDataFemale)];

  return (
    <div className=" sticky top-[120px] ml-10 flex  flex-col bg-white p-20">
      <div className="sticky top-[120px]">
        <div className=" py-5">
          <h2 className="text-bold text-2xl text-gray-900">Categories</h2>
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
            {categoriesMale.map((category, index) => (
              <Link
                className=" text-md my-1 text-gray-700"
                onClick={() => {
                  dispatch(filterByCategoryMale(category.toLowerCase()));
                  dispatch(resetFilterByColorAndSortByPrice());
                }}
                key={index}
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
            {categoriesFemale.map((category, index) => (
              <Link
                className=" text-md my-1 text-gray-700"
                onClick={() => {
                  dispatch(filterByCategoryFemale(category.toLowerCase()));
                  dispatch(resetFilterByColorAndSortByPrice());
                }}
                key={index}
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
