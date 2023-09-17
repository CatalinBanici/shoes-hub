import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    // <div className=" relative m-auto flex w-full max-w-[1600px] flex-col ">
    <body className="font-roboto  flex w-full flex-col  bg-gray-100">
      <header className=" fixed z-10 flex h-20 w-full items-center bg-white shadow shadow-gray-200">
        <Navbar />
      </header>
      <main className=" w-full  pb-32">
        <Outlet />
      </main>
      <footer className="w-full bg-gray-500">
        <div className=" mx-auto flex h-56 max-w-[1600px] flex-row justify-between  text-white">
          <div>content</div>
          <div>content</div>
        </div>
      </footer>
    </body>

    // </div>
  );
}
