/* eslint-disable react/prop-types */
import { Flowbite } from "flowbite-react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import FooterLayout from "./footer";

export default function Layout() {
  const isAllTodosPage = location.pathname.includes("/todos");
  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen dark:bg-gradient-to-b from-main-dark to-sub-dark">
        <Navbar />
        <div className={`${!isAllTodosPage ? "mb-auto mx-auto mt-5 py-5 flex justify-center items-center sm:mx-2 px-2" : "mb-auto mt-5"}`}>
          <Outlet />
        </div>
        <FooterLayout />
      </div>
    </Flowbite>
  );
}
