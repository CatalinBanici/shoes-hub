import React from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterById } from "../../../redux/features/slices/productsSlice";

export default function ProductsList() {
  const products = useSelector((state) => state.products.filteredProducts);
  const dispatch = useDispatch();

  return (
    <div className="items-top mx-10 flex flex-1 flex-wrap justify-around gap-10">
      {products.map((product) => (
        <Link
          to={product.id}
          key={product.id}
          onClick={() => dispatch(filterById(product.id))}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
