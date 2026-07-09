import React from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm flex-wrap">
        <nav className="flex justify-between items-center px-12 py-4">
          <h1
            className="text-5xl font-bold text-orange-500"
            onClick={() => navigate(`/`)}
          >
            FoodFlow
          </h1>
          <div className="flex items-center gap-8">
            <div className="flex items-center border w-[600px] rounded-xl px-4 py-2 shadow-sm ">
              <FiSearch className="text-gray-500 text-xl mr-3 " />
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Search for restaurant or a dish"
              />
            </div>
            <button className="text-lg text-gray-600 hover:text-black">
              Log in
            </button>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-xl text-lg transition ">
              Sign up
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
