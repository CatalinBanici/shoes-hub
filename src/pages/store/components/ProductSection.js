import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/slices/cartSlice";

export default function ProductSection() {
  const [colorIndex, setColorIndex] = useState(0);
  const [colorValue, setColorValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const product = useSelector((state) => state.products.singleProduct);
  //getting the discount % if there is any
  const substract = product[0].price.current - product[0].price.old;
  const divide = substract / product[0].price.old;
  const discount = divide * 100;
  const dispatch = useDispatch();

  const colors = product[0].stock[colorIndex].colors;
  console.log("colors", colors);
  const sizes = product[0].stock[colorIndex].colors.map((item) => {
    return Object.values(item)[0];
  });
  const outOfStock = sizes.reduce((a, b) => a + b, 0);
  console.log("sizes", sizes);
  console.log("out of stock", outOfStock);
  console.log("color value", colorValue);
  console.log("size value", sizeValue);
  return (
    <section className="my-10 ml-5 mr-10 w-[55%]">
      <div className="mb-5 bg-white p-5">
        <h2 className=" my-5 text-2xl text-gray-800">{product[0].name}</h2>
        <h4 className=" my-5 text-lg text-gray-700">
          {product[0].description}
        </h4>
      </div>
      <hr />
      <div className="my-5">
        <span className="mx-5 text-3xl text-gray-900">
          ${product[0].price.current}
        </span>
        {product[0].price.discount && (
          <>
            <span className="mx-5 text-xl text-gray-600 line-through">
              ${product[0].price.old}
            </span>
            <span className="text-md text-gray-600">
              {Math.trunc(discount)}% off
            </span>
          </>
        )}
      </div>
      <hr />
      <div>
        <div className="relative">
          <h2>Colors:</h2>
          <div className="flex h-36 flex-row gap-4">
            {colors.map((color, index) => (
              <div key={index}>
                <div className="flex w-full items-center justify-center">
                  <label className="" htmlFor={index}>
                    {Object.keys(color)[1]}
                  </label>
                </div>

                <div className="relative h-20 w-20">
                  <input
                    className="peer relative z-10 h-full w-full  cursor-pointer opacity-0 "
                    id={index}
                    name="color"
                    type="radio"
                    disabled={Object.values(color)[0] <= 0}
                    value={colorValue}
                    onChange={(e) => setColorValue(Object.keys(color)[1])}
                  />
                  <img
                    className={`${
                      Object.values(color)[0] <= 0 && " opacity-50"
                    } border-gray absolute left-0 top-0 h-full w-full border-2 peer-checked:border-gray-600 peer-disabled:border-red-500  `}
                    src={`${Object.values(color)[1]}`}
                  />
                </div>
                <div className="text-center text-sm text-red-500">
                  {(Object.values(color)[0] <= 0 && "Out of stock!") ||
                    (Object.values(color)[0] <= 3 &&
                      `Only ${Object.values(color)[0]} left`)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div>
            <h2>Sizes:</h2>
          </div>
          <div className="flex flex-row">
            {product[0].stock.map((item, index) => (
              <div className="relative mx-1  h-10 w-10" key={index}>
                <input
                  className="peer relative left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 "
                  type="radio"
                  id={index}
                  name="size"
                  value={sizeValue}
                  onChange={() => {
                    setColorIndex(index);
                    setColorValue("");
                    setSizeValue(item.size);
                  }}
                  disabled={
                    // to work on this shit
                    colorIndex === index && outOfStock === 0 ? true : false
                  }
                />
                <label className="absolute left-0 top-0 flex h-full w-full  items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-gray-600 peer-disabled:border-red-500">
                  {item.size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className=" disabled:bg-gray-500"
        onClick={() =>
          colorValue &&
          sizeValue &&
          dispatch(
            addToCart({
              id: product[0].id,
              img: product[0].gallery.main,
              amount: 1,
              price: product[0].price.current,
              name: product[0].name,
              size: sizeValue,
              color: colorValue,
            }),
          )
        }
      >
        add
      </button>
    </section>
  );
}
