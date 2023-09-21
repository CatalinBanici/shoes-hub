import React from "react";
import SideBar from "./components/SideBar";
import ProductsList from "./components/ProductsList";

export default function Store() {
  return (
    <div className=" relative top-20 m-10 mx-auto flex max-w-[1600px] flex-row">
      <SideBar />
      <ProductsList />
    </div>
  );
}
