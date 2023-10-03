import React, { useState } from "react";

export default function ProductFilters({ products }) {
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

  const [filteredColors, setFilteredColors] = useState(colors);
  const [filterValues, setFilterValues] = useState({
    colors: "",
    price: "",
  });

  function toggleColor(index) {
    const updatedColors = [...filteredColors];
    updatedColors[index].selected = !updatedColors[index].selected;
    setFilteredColors(updatedColors);
    setFilterValues({
      ...filterValues,
      colors: updatedColors[index].name,
    });
    //dispatch here updatedColors[index]
    // console.log(updatedColors[index]);
  }
  console.log(filterValues);

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}
