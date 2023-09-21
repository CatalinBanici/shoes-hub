import React from "react";
import menCategory from "../../../assets/images/home-page/men.jpg";
import womenCategory from "../../../assets/images/home-page/women.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterByGender } from "../../../redux/features/slices/productsSlice";

export default function Categories() {
  const dispatch = useDispatch();

  return (
    <div className="my-20 flex w-full flex-row justify-around">
      <div className="group relative overflow-hidden">
        <div className="absolute top-5 w-full text-center text-2xl font-bold uppercase text-white">
          Men's Collection
        </div>
        <img
          className=" h-[500px] w-[500px] object-cover object-top"
          src={menCategory}
          alt="Men Category"
        />
        <div className=" invisible absolute flex h-[50%] w-full items-center justify-center bg-black  bg-opacity-50 duration-200 ease-out group-hover:visible group-hover:translate-y-[-100%]">
          <Link
            className=" md rounded bg-orange-500 px-10 py-5 text-lg text-white"
            to="store"
            onClick={() => dispatch(filterByGender("male"))}
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="group relative overflow-hidden">
        <div className="absolute top-5 w-full text-center text-2xl font-bold uppercase text-black">
          Women's Collection
        </div>
        <img
          className=" h-[500px] w-[500px] object-cover object-top"
          src={womenCategory}
          alt="Men Category"
        />
        <div className=" invisible absolute flex h-[50%] w-full items-center justify-center bg-black  bg-opacity-50 duration-200 ease-out group-hover:visible group-hover:translate-y-[-100%]">
          <Link
            className=" md rounded bg-orange-500 px-10 py-5 text-lg text-white"
            to="store"
            onClick={() => dispatch(filterByGender("female"))}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
