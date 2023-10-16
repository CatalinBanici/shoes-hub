import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByColor,
  resetFilters,
} from "../../../redux/features/slices/productsSlice";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

export default function ProductFilters({ products }) {
  const dispatch = useDispatch();
  // creating an array of all the product colors
  const productColors = products.map((product) => {
    const stock = product.stock.map((e) => e);
    const colorsStock = stock[1].colors;
    const colorValues = colorsStock.map((e) => e.colorValue);
    return colorValues;
  });
  const colorsArray = [...new Set(productColors.flat())];
  const colors = colorsArray.map((color) => {
    return { name: color, selected: false };
  });

  // i need to find a way to change this state when i click on a category in the sidebar component
  // so the colors will automatically change when i switch a category type
  // i can try to put a useeffect here and inside it setfilteredcolors and the state.filteredproducts as a dependency arr

  const [filteredColors, setFilteredColors] = useState(colors);
  const [price, setPrice] = useState("none");
  const [colorMenu, setColorMenu] = useState(false);

  useEffect(() => {
    setFilteredColors(colors);
    setPrice(null);
    console.log("effect");
  }, [products]);

  const updatedColors = [...filteredColors];

  const checkedColor = filteredColors.filter((e) => e.selected === true);

  const singleColor = checkedColor.map((e) => e.name);

  function toggleColor(index) {
    updatedColors[index].selected = !updatedColors[index].selected;
    setFilteredColors(updatedColors);
  }

  function priceSort(event) {
    setPrice(event.target.value);
  }

  console.log("price", price);

  const filterAndSortValues = {
    filterByColor: singleColor,
    sortByPrice: price,
  };

  console.log("filterAndSortValues", filterAndSortValues);

  //   console.log("filteredColors", filteredColors);
  //   console.log("checkedColor", checkedColor);
  //   console.log("singleColor", singleColor);
  //   console.log("colors", colors);

  const colorMenuRef = useRef();
  const colorButtonRef = useRef();

  useEffect(() => {
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
    console.log("effect");
    document.addEventListener("mousedown", closeNavOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeNavOnOutsideClick);
    };
  }, [colorMenu]);

  return (
    <>
      <div className="mx-3 flex flex-1">
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

        <div>
          <button
            onClick={() => dispatch(filterByColor(filterAndSortValues))}
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
              dispatch(resetFilters());
              setFilteredColors(colors);
              setPrice(null);
            }}
            className="m-2 p-2 disabled:text-gray-400"
          >
            Reset Filters
          </button>
        </div>
      </div>
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

      {/* <div>
        <button
          className="disabled:bg-gray-400"
          disabled={
            !filterAndSortValues.filterByColor.length &&
            filterAndSortValues.sortByPrice === "none"
          }
          onClick={() => dispatch(filterByColor(filterAndSortValues))}
        >
          dispatch
        </button>
        <hr />
        <button
          onClick={() => {
            dispatch(resetFilters());
            setFilteredColors(colors);
            setPrice("none");
          }}
        >
          reset
        </button>
        <hr />
        <div>
          <select name="priceSorting" onChange={priceSort}>
            <option defaultValue="none" hidden>
              sort by price
            </option>
            <option selected={price === "price+"} value="price+">
              price 0-9
            </option>
            <option selected={price === "price-"} value="price-">
              price 9-0
            </option>
          </select>
        </div>
        <hr />

        <button>Select a color</button>
        <div>
          {filteredColors.map((color, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="color-input"
                id={index}
                value={color.name}
                checked={color.selected}
                onChange={() => toggleColor(index)}
              />
              <label htmlFor={index}>{color.name}</label>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
