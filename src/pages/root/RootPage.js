import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <div className="font-roboto flex max-w-[1500px] flex-col">
      <header className=" flex h-20 w-full items-center">
        <Navbar />
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
