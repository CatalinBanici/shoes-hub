import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductsList() {
  const products = useSelector((state) => state.products.filteredProducts);
  console.log(products);
  return (
    <div className="items-top mx-10 flex flex-1 flex-wrap justify-around gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
