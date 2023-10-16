import React from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterById } from "../../../redux/features/slices/productsSlice";
import ProductFilters from "./ProductFilters";

export default function ProductsList() {
  const products = useSelector((state) => state.products.filteredProducts);
  const sortedProducts = useSelector(
    (state) => state.products.colorFilteredProducts,
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className=" mx-10 flex flex-row bg-white">
        <ProductFilters products={products} />
      </div>
      <div className="items-top m-10 flex flex-1 flex-wrap justify-around gap-10">
        {sortedProducts.length
          ? sortedProducts.map((product) => (
              <Link
                to={product.id}
                key={product.id}
                onClick={() => dispatch(filterById(product.id))}
              >
                <ProductCard product={product} />
              </Link>
            ))
          : products.map((product) => (
              <Link
                to={product.id}
                key={product.id}
                onClick={() => dispatch(filterById(product.id))}
              >
                <ProductCard product={product} />
              </Link>
            ))}

        {}
      </div>
    </div>
  );
}
