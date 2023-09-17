import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <div className=" relative flex w-full max-w-[1600px] flex-col ">
      <header className=" fixed z-10 flex h-20 w-full items-center bg-white shadow shadow-gray-200">
        <Navbar />
      </header>
      <main className=" w-full pb-32">
        <Outlet />
      </main>
      <footer className="w-full">
        <div className=" h-56 bg-gray-500"></div>
      </footer>
    </div>
  );
}
