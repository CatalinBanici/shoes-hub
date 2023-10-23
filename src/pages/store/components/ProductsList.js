// REDUX
import { useDispatch, useSelector } from "react-redux";
import { filterById } from "../../../redux/features/slices/productsSlice";

// REACT ROUTER
import { Link } from "react-router-dom";

// COMPONENTS
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductsList() {
  const categoryAndGenderFilteredProducts = useSelector(
    (state) => state.products.categoryAndGenderFilteredProducts,
  );
  const colorFilteredAndPriceSortedProducts = useSelector(
    (state) => state.products.colorFilteredAndPriceSortedProducts,
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className=" mx-10 flex flex-row bg-white">
        <ProductFilters products={categoryAndGenderFilteredProducts} />
      </div>
      <ul className="items-top m-10 flex flex-1 flex-wrap justify-around gap-10">
        {colorFilteredAndPriceSortedProducts.length
          ? colorFilteredAndPriceSortedProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={product.id}
                  onClick={() => dispatch(filterById(product.id))}
                >
                  <ProductCard product={product} />
                </Link>
              </li>
            ))
          : categoryAndGenderFilteredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  to={product.id}
                  onClick={() => dispatch(filterById(product.id))}
                >
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
