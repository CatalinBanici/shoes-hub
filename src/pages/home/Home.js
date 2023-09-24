import React from "react";
import Carousel from "./components/Carousel";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <div className="relative top-[-80px] ">
      <Carousel />
      <Categories />
    </div>
  );
}
