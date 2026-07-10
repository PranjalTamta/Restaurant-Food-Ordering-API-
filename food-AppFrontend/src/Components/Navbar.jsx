import React, { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/DataContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { resturants, foods } = useAppData();

  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResdults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchedResturants = query
    ? resturants.filter((r) =>
        r.title?.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const matchedFoods = query
    ? foods.filter((f) => f.title?.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const goToResturant = (id) => {
    setShowResults(false);
    setQuery("");
    setShowSearch(false);
    navigate(`/resturant/${id}`);
  };
  const SearchDropdown = () =>
    showResults && query ? (
      <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
        {matchedResturants.length === 0 && matchedFoods.length === 0 ? (
          <p className="px-4 py-6 text-center text-gray-400">
            No results for "{query}"
          </p>
        ) : (
          <>
            {matchedResturants.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                  Restaurants
                </p>
                {matchedResturants.map((r) => (
                  <div
                    key={r._id}
                    onClick={() => goToResturant(r._id)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <p className="text-sm text-gray-500">{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {matchedFoods.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                  Dishes
                </p>
                {matchedFoods.map((f) => (
                  <div
                    key={f._id}
                    onClick={() => goToResturant(f.resturant)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={f.imgUrl}
                      alt={f.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{f.title}</p>
                      <p className="text-sm text-gray-500">₹{f.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    ) : null;
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
          <div ref={searchRef} className="relative w-[450px] lg:w-[600px]">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm w-[450px] lg:w-[600px]">
              <FiSearch className="text-gray-500 text-xl mr-3" />

              <input
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={() => query && setShowResults(true)}
                placeholder="Search for restaurant or a dish"
                className="w-full outline-none"
              />
            </div>
            {/* 
            <button className="text-lg text-gray-700 hover:text-orange-500">
              Log in
            </button>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition">
              Sign up
            </button> */}
            <SearchDropdown />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-5 md:hidden">
            <button onClick={() => setShowSearch(!showSearch)}>
              <FiSearch size={22} />
            </button>

            {/* <button onClick={() => setOpenMenu(true)}>
              <HiOutlineMenu size={28} />
            </button> */}
          </div>
        </nav>

        {/* Mobile Search */}
        {showSearch && (
          <div ref={searchRef} className="relative md:hidden px-4 pb-4">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
              <FiSearch className="text-gray-500 mr-3" />
              <input
                type="text"
                value={query}
                onChange={handleChange}
                autoFocus
                placeholder="Search restaurants or dishes..."
                className="w-full outline-none"
              />
            </div>
            <SearchDropdown />
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
