// REACT
import { useState } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/slices/cartSlice";

export default function ProductSection({ product }) {
  const dispatch = useDispatch();

  // getting the discount % if there is any
  const substract = product[0].price.current - product[0].price.old;
  const divide = substract / product[0].price.old;
  const discount = divide * 100;

  const stock = product[0].stock.map((stockItem) => stockItem);
  const [selectedProductStock, setSelectedProductStock] = useState(stock[0]);
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [sizeNumber, setSizeNumber] = useState(selectedProductStock.size);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <section className="my-10 ml-5 mr-10 w-[55%]">
      {/* product name and description */}
      <div className="mb-5 bg-white p-5">
        <h2 className=" my-5 text-2xl text-gray-800">{product[0].name}</h2>
        <h4 className=" my-5 text-lg text-gray-700">
          {product[0].description}
        </h4>
      </div>

      {/* product price */}
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
      <div className="h-[300px]">
        {/* product size */}
        <div className="relative my-5">
          <h2 className="my-3 text-xl">Select a size:</h2>
          <div className="flex flex-row">
            {stock.map((stockItem, index) => (
              <div className="relative mx-1  h-10 w-10" key={index}>
                <input
                  className="peer relative left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 "
                  type="radio"
                  id={index}
                  name="size"
                  onChange={() => {
                    setSelectedProductStock(stock[index]);
                    setSizeNumber(stockItem.size);
                    setNumberOfProducts(0);
                    setColorName("");
                    setColorValue("");
                    setProductCount(1);
                    setErrorMessage("");
                  }}
                  checked={stockItem.size === selectedProductStock.size}
                />
                <label className="absolute left-0 top-0 flex h-full w-full  items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-gray-600 ">
                  {stockItem.size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* product color */}
        <div className="relative mt-5">
          <h2 className="my-3 text-xl">Select a color:</h2>
          <div className="flex h-32 flex-row gap-4">
            {selectedProductStock.colors.map((colorItem, index) => (
              <div key={index}>
                <div className="flex w-full items-center justify-center">
                  <label className="" htmlFor={index}>
                    {colorItem.colorName.charAt(0).toUpperCase() +
                      colorItem.colorName.slice(1)}
                  </label>
                </div>

                <div className="relative h-20 w-20">
                  <input
                    className="peer relative z-10 h-full w-full  cursor-pointer opacity-0 "
                    id={index}
                    name="color"
                    type="radio"
                    disabled={colorItem.numberOfItems <= 0}
                    onChange={() => {
                      setColorName(colorItem.colorName);
                      setColorValue(colorItem.colorValue);
                      setNumberOfProducts(colorItem.numberOfItems);
                      setProductCount(1);
                    }}
                    checked={colorItem.colorName === colorName}
                  />
                  <img
                    className={`${
                      colorItem.numberOfItems <= 0 && " opacity-50"
                    } border-gray absolute left-0 top-0 h-full w-full border-2 peer-checked:border-gray-600 peer-disabled:border-red-500  `}
                    src={`${colorItem.colorImage}`}
                    alt={`${colorItem.colorName}`}
                  />
                </div>
                <div className="text-center text-sm text-red-500">
                  {(colorItem.numberOfItems <= 0 && "Out of stock!") ||
                    (colorItem.numberOfItems <= 3 &&
                      `Only ${colorItem.numberOfItems} left`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* product stock number */}
        {colorName && (
          <div className="text-gray-800">In stock: {numberOfProducts}</div>
        )}
      </div>
      <div className="flex w-full flex-col bg-white">
        {/* product quantity */}
        <div className="m-4 flex flex-row">
          <h3 className="text-lg ">Choose Quantity:</h3>
          <div className="mx-4">
            <button
              disabled={productCount === 1 || !colorName}
              onClick={() => setProductCount((count) => count - 1)}
              className="h-7 w-7 rounded-full bg-gray-200 text-lg disabled:bg-gray-100 disabled:text-gray-400"
            >
              -
            </button>
            <span className="mx-2">{productCount}</span>
            <button
              onClick={() => setProductCount((count) => count + 1)}
              className="h-7 w-7 rounded-full bg-gray-200 text-lg disabled:bg-gray-100 disabled:text-gray-400"
              disabled={productCount === numberOfProducts || !colorName}
            >
              +
            </button>
          </div>
        </div>

        {/* buy now and add to cart buttons */}
        <div className="h-[110px]">
          <div className="flex h-20 w-full items-center justify-around">
            <button className="rounded-xl bg-orange-400 px-10 py-3 text-xl text-white ">
              Buy Now
            </button>
            <button
              onClick={() => {
                numberOfProducts &&
                  dispatch(
                    addToCart({
                      id: product[0].id,
                      name: product[0].name,
                      img: product[0].gallery.main,
                      sizeNumber: sizeNumber,
                      colorName: colorName,
                      colorValue: colorValue,
                      price: product[0].price.current,
                      totalPrice: product[0].price.current,
                      amount: productCount,
                    }),
                  );
                !numberOfProducts && setErrorMessage("You must pick a color!");
              }}
              className="rounded-lg border-4 border-gray-400 px-10 py-3 text-xl text-gray-800"
            >
              Add to Cart
            </button>
          </div>
          {!numberOfProducts && (
            <p className="mx-4 text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
