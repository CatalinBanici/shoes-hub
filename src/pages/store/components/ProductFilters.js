// REACT
import { useEffect, useRef, useState } from "react";

// REDUX
import { useDispatch } from "react-redux";
import {
  filterByColorAndSortByPrice,
  resetFilterByColorAndSortByPrice,
} from "../../../redux/features/slices/productsSlice";

// REACT ICONS
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

export default function ProductFilters({ products }) {
  const colorMenuRef = useRef();
  const colorButtonRef = useRef();
  const dispatch = useDispatch();

  // creating an array of arrays of all the colors from each product
  const productColors = products.map((product) => {
    const stock = product.stock.map((e) => e);
    const colorsStock = stock[1].colors;
    const colorValues = colorsStock.map((e) => e.colorValue);
    return colorValues;
  });

  // flattening the productColors array and getting only one color type
  const colorsArray = [...new Set(productColors.flat())];

  // getting the selected color and toggling it
  const colors = colorsArray.map((color) => {
    return { name: color, selected: false };
  });
  const [filteredColors, setFilteredColors] = useState(colors);
  const updatedColors = [...filteredColors];
  const checkedColor = filteredColors.filter((e) => e.selected === true);
  const singleColor = checkedColor.map((e) => e.name);

  function toggleColor(index) {
    updatedColors[index].selected = !updatedColors[index].selected;
    setFilteredColors(updatedColors);
  }

  // price sorting type
  const [price, setPrice] = useState("none");

  function priceSort(event) {
    setPrice(event.target.value);
  }

  // color dropdown menu
  const [colorMenu, setColorMenu] = useState(false);

  useEffect(() => {
    // close the color menu dropdown when user clicks outside of it
    function closeNavOnOutsideClick(e) {
      if (
        colorMenu === true &&
        colorMenuRef.current &&
        !colorMenuRef.current.contains(e.target) &&
        !colorButtonRef.current.contains(e.target)
      ) {
        setColorMenu(false);
      }
    }
    document.addEventListener("mousedown", closeNavOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeNavOnOutsideClick);
    };
  }, [colorMenu]);

  // when products (categoryAndGenderFilteredProducts) change, reset all filters
  useEffect(() => {
    setFilteredColors(colors);
    setPrice(null);
  }, [products]);

  // values to be dispatched
  const filterAndSortValues = {
    filterByColor: singleColor,
    sortByPrice: price,
  };

  return (
    <>
      <div className="mx-3 flex flex-1">
        {/* color filter menu dropdown */}
        <div className="relative">
          <button
            ref={colorButtonRef}
            className="m-2 flex flex-row items-center p-2"
            onClick={() => setColorMenu(!colorMenu)}
          >
            Filter Color
            <span className="mx-2">
              {colorMenu ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </span>
          </button>
          <ul
            ref={colorMenuRef}
            className={
              colorMenu
                ? "absolute z-10 h-52 overflow-auto bg-white p-4 shadow-lg"
                : "hidden"
            }
          >
            {filteredColors.map((color, index) => (
              <li className="p-2 " key={index}>
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="color-filter"
                  id={color.name}
                  value={color.name}
                  checked={color.selected}
                  onChange={() => toggleColor(index)}
                />
                <label className="cursor-pointer px-2" htmlFor={color.name}>
                  {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* price sorting buttons */}
        <div onChange={priceSort} className="flex items-center">
          <div className="relative mx-2">
            <input
              className=" peer absolute h-full w-full cursor-pointer  opacity-0  "
              type="radio"
              name="price-sort+"
              id="price+"
              value="price+"
              checked={price === "price+"}
            />
            <label
              className=" h-full w-full cursor-pointer rounded-md border-2 border-white p-2 peer-checked:border-2 peer-checked:border-gray-600 peer-focus:border-black"
              htmlFor="price+"
            >
              Low Price
            </label>
          </div>
          <div className="relative mx-2">
            <input
              className=" peer absolute h-full w-full cursor-pointer  opacity-0  "
              type="radio"
              name="price-sort-"
              id="price-"
              value="price-"
              checked={price === "price-"}
            />
            <label
              className=" h-full w-full cursor-pointer rounded-md border-2 border-white p-2 peer-checked:border-2 peer-checked:border-gray-600 peer-focus:border-black"
              htmlFor="price-"
            >
              High Price
            </label>
          </div>
        </div>

        {/* apply and reset filters buttons */}
        <div>
          <button
            onClick={() =>
              dispatch(filterByColorAndSortByPrice(filterAndSortValues))
            }
            className="m-2 rounded-lg bg-gray-100 p-2 disabled:bg-white disabled:text-gray-400"
            disabled={
              !filterAndSortValues.filterByColor.length &&
              filterAndSortValues.sortByPrice === null
            }
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              dispatch(resetFilterByColorAndSortByPrice());
              setFilteredColors(colors);
              setPrice(null);
            }}
            className="m-2 p-2 disabled:text-gray-400"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* search filter */}
      <div className=" mx-3 flex items-center">
        <div className="mx-2 flex h-10 items-center rounded-md border-2 border-gray-600">
          <input
            className=" px-2 py-1 outline-none"
            type="search"
            placeholder="Search for a product..."
          />
          <button className="flex h-full w-10 items-center justify-center rounded-r-md bg-gray-200">
            <BsSearch />
          </button>
        </div>
      </div>
    </>
  );
}
