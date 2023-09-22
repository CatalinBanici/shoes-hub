import React from "react";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const product = useSelector((state) => state.products.singleProduct);
  console.log("product", product);
  return <div>{product[0].name}</div>;
}
