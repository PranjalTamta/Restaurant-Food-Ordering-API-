import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
          {/* Logo */}
          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            FoodFlow
          </h1>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm w-[450px] lg:w-[600px]">
              <FiSearch className="text-gray-500 text-xl mr-3" />

              <input
                type="text"
                placeholder="Search for restaurant or a dish"
                className="w-full outline-none"
              />
            </div>

            <button className="text-lg text-gray-700 hover:text-orange-500">
              Log in
            </button>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition">
              Sign up
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-5 md:hidden">
            <button onClick={() => setShowSearch(!showSearch)}>
              <FiSearch size={22} />
            </button>

            <button onClick={() => setOpenMenu(true)}>
              <HiOutlineMenu size={28} />
            </button>
          </div>
        </nav>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
              <FiSearch className="text-gray-500 mr-3" />

              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className="w-full outline-none"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {openMenu && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold">Menu</h2>

              <button onClick={() => setOpenMenu(false)}>
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-5">
              <button
                className="block text-lg"
                onClick={() => {
                  navigate("/");
                  setOpenMenu(false);
                }}
              >
                Home
              </button>

              <button className="block text-lg">Categories</button>

              <hr />

              <button className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition">
                Log in
              </button>

              <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition">
                Sign up
              </button>
            </div>
          </div>

          {/* Overlay */}
          <div className="w-full h-full" onClick={() => setOpenMenu(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
