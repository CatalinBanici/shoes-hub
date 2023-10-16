import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <div className=" relative m-auto flex w-full max-w-[1600px] flex-col ">
    <body className="box-border  flex w-full flex-col  bg-gray-100 font-roboto">
      <header
        className={`${
          scrollPosition === 0
            ? "bg-[hsl(0, 0%, 100%, 0.1)] backdrop-blur-lg"
            : "bg-white"
        } fixed z-20 flex h-20 w-full items-center shadow shadow-gray-200  duration-150 ease-out`}
      >
        <Navbar scrollPosition={scrollPosition} />
      </header>
      <main className=" relative top-20 w-full pb-32">
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
