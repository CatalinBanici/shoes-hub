import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/slices/cartSlice";

export default function ProductSection() {
  const product = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();

  // getting the discount % if there is any
  const substract = product[0].price.current - product[0].price.old;
  const divide = substract / product[0].price.old;
  const discount = divide * 100;

  const stock = product[0].stock.map((element) => {
    return element;
  });
  const [productStock, setProductStock] = useState(stock[0]);
  const [colorValue, setColorValue] = useState("");
  const [sizeValue, setSizeValue] = useState(productStock.size);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  console.log("product", product);
  console.log("stock", stock);
  console.log("productstock", productStock);
  console.log("sizeValue", sizeValue);
  console.log("colorValue", colorValue);
  console.log("numberOfProducts", numberOfProducts);
  return (
    <section className="my-10 ml-5 mr-10 w-[55%]">
      <div className="mb-5 bg-white p-5">
        <h2 className=" my-5 text-2xl text-gray-800">{product[0].name}</h2>
        <h4 className=" my-5 text-lg text-gray-700">
          {product[0].description}
        </h4>
      </div>
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
        <div className="relative my-5">
          <h2 className="my-3 text-xl">Select a size:</h2>
          <div className="flex flex-row">
            {stock.map((element, index) => (
              <div className="relative mx-1  h-10 w-10" key={index}>
                <input
                  className="peer relative left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 "
                  type="radio"
                  id={index}
                  name="size"
                  onChange={() => {
                    setProductStock(stock[index]);
                    setSizeValue(element.size);
                    setNumberOfProducts(0);
                    setColorValue("");
                  }}
                  checked={element.size === productStock.size}
                />
                <label className="absolute left-0 top-0 flex h-full w-full  items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-gray-600 ">
                  {element.size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="relative my-5">
          <h2 className="my-3 text-xl">Select a color:</h2>
          <div className="flex h-36 flex-row gap-4">
            {productStock.colors.map((color, index) => (
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
                    onChange={() => {
                      setColorValue(Object.keys(color)[1]);
                      setNumberOfProducts(color.numberOfItems);
                    }}
                    checked={Object.keys(color)[1] === colorValue}
                  />
                  <img
                    className={`${
                      Object.values(color)[0] <= 0 && " opacity-50"
                    } border-gray absolute left-0 top-0 h-full w-full border-2 peer-checked:border-gray-600 peer-disabled:border-red-500  `}
                    src={`${Object.values(color)[1]}`}
                    alt={`${Object.keys(color)[1]}`}
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
      </div>
      <button
        className=" disabled:bg-gray-500"
        onClick={() =>
          numberOfProducts &&
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
