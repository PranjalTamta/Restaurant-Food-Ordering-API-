import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/apiConfig";

const Category = ({ selectedCategory, onSelectCategory }) => {
  const [showAll, setshowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/category/getAll`);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Burger",
  //     image: burger,
  //   },
  //   {
  //     id: 2,
  //     name: "Pizza",
  //     image: pizza,
  //   },
  //   {
  //     id: 3,
  //     name: "Sandwich",
  //     image: sandwich,
  //   },
  //   {
  //     id: 4,
  //     name: "Biryani",
  //     image: biryani,
  //   },
  //   {
  //     id: 5,
  //     name: "Burger",
  //     image: burger,
  //   },
  //   {
  //     id: 6,
  //     name: "Pizza",
  //     image: pizza,
  //   },
  //   {
  //     id: 7,
  //     name: "Sandwich",
  //     image: sandwich,
  //   },
  //   {
  //     id: 8,
  //     name: "Biryani",
  //     image: biryani,
  //   },
  //   {
  //     id: 9,
  //     name: "Burger",
  //     image: burger,
  //   },
  //   {
  //     id: 10,
  //     name: "Pizza",
  //     image: pizza,
  //   },
  //   {
  //     id: 11,
  //     name: "Sandwich",
  //     image: sandwich,
  //   },
  //   {
  //     id: 12,
  //     name: "Biryani",
  //     image: biryani,
  //   },
  // ];
  const visibleCategories = showAll ? categories : categories.slice(0, 8);
  if (loading) {
    return (
      <div>
        <div className="px-8 py-4 text-2xl font-medium">
          <h1>Categories</h1>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div className="flex flex-col items-center" key={i}>
                <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-3 w-12 mt-2 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="px-8 py-4 text-2xl font-medium">
          <h1>Categories</h1>
        </div>
        <div className=" grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 ">
          {visibleCategories.map((item) => (
            <div
              className="flex flex-col items-center cursor-pointer"
              key={item._id}
              onClick={() =>
                onSelectCategory(
                  selectedCategory === item.name ? null : item.name,
                )
              }
            >
              <img
                className={`h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 rounded-full object-cover border-4 ${selectedCategory === item.name ? "border-orange-500" : "border-transparent"}`}
                src={item.imageUrl}
                alt={item.name}
              />
              <p
                className={`text-sm md:text-base mt-1 text-center ${
                  selectedCategory === item.name
                    ? "text-orange-500 font-semibold"
                    : ""
                }`}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        {categories.length > 8 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setshowAll(!showAll)}
              className="text-orange-500 text-2xl"
            >
              {showAll ? "▲ Show Less" : "▼ Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
