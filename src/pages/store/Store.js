import React from "react";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

export default function Store() {
  return (
    <div className=" relative top-20 m-10 mx-auto flex max-w-[1600px] flex-row">
      <SideBar />
      <Outlet />
    </div>
  );
}
