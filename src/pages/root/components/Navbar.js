import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="mx-10  flex items-center ">
        <span className="pr-1 text-xl">Shoes</span>
        <span className="rounded-md bg-orange-600 px-3 py-2 text-xl font-bold text-white">
          HUB
        </span>
      </div>
      <div className="mx-10 flex flex-1 justify-center">
        <nav>
          <ul className="">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "mx-10 font-bold text-orange-600"
                  : "mx-10 text-black"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "mx-10 font-bold text-orange-600"
                  : "mx-10 text-black"
              }
              to="store"
            >
              Store
            </NavLink>
          </ul>
        </nav>
      </div>
      <div className="mx-10">Cart</div>
    </div>
  );
}
