import React, { useState, useEffect } from "react";
// import { resturant } from "../Components/Resturants";
import { useParams } from "react-router-dom";
// import burger from "../assets/burger.jpg";
// import pizza from "../assets/pizza.jpg";
// import sandwich from "../assets/sandwich.jpg";
// import biryani from "../assets/biryani.jpg";
import axios from "axios";
import API_URL from "../config/apiConfig";
// import VegBadge from "./VegBadge";

// export const menu = [
//   {
//     id: 1,
//     name: "Margherita Pizza",
//     price: 249,
//     image: pizza,
//     category: "Dinner",
//     isVeg: true,
//     description:
//       "The perfect combination of pineapple and cheese on a crispy crust.",
//   },
//   {
//     id: 2,
//     name: "Cheese Burger",
//     price: 199,
//     image: burger,
//     category: "fastFood",
//     isVeg: true,
//     description:
//       "The perfect combination of pineapple and cheese on a crispy crust.",
//   },
//   {
//     id: 3,
//     name: "Club Sandwich",
//     price: 149,
//     image: sandwich,
//     category: "BreakFast",
//     isVeg: true,
//     description:
//       "The perfect combination of pineapple and cheese on a crispy crust.",
//   },
//   {
//     id: 4,
//     name: "Chicken Biryani",
//     price: 299,
//     image: biryani,
//     category: "Dinner",
//     isVeg: false,
//     description:
//       "The perfect combination of pineapple and cheese on a crispy crust.",
//   },
// ];
const Categories = [
  "All",
  "Veg",
  "Non-Veg",
  "Breakfast",
  "Fast Food",
  "Lunch",
  "Dinner",
];
const ResturantDetails = () => {
  const { id } = useParams();
  const [resturant, setResturant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, foodRes] = await Promise.all([
          axios.get(`${API_URL}/api/v1/resturant/get/${id}`),
          axios.get(`${API_URL}/api/v1/food/getByResturant/${id}`),
        ]);

        setResturant(restaurantRes.data.resturant);
        setFoods(foodRes.data.Foods || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="px-8 py-4">Loading...</p>;
  if (error) return <p className="px-8 py-4 text-red-500">Error: {error}</p>;
  if (!resturant) return <p className="px-8 py-4">Resturant not found</p>;

  const menu = foods.filter((food) => String(food.resturant) === String(id));

  const filteredMenu = menu.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Veg") {
      return item.category?.toLowerCase() === "veg";
    }
    if (activeCategory === "Non-Veg") {
      return item.category?.toLowerCase() !== "veg";
    }
    return item.category === activeCategory || item.foodTags === activeCategory;
  });

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mt-4">{resturant.title}</h1>
      <img
        className="w-full h-[60vh] object-cover rounded-xl"
        src={resturant.imageUrl}
        alt={resturant.title}
      />
      <p className="text-gray-500">{resturant.description}</p>
      <h2 className="text-2xl font-semibold mt-8">Food Menu</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {Categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border transition ${
              activeCategory === cat
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-white text-gray-500 hover:border-orange-500"
            } `}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-3 w-full sm:w-[45%] md:w-[30%]"
            >
              <img
                src={item.imgUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                  {item.category || "Uncategorized"}
                </span>
              </div>
              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <div>{item.description}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 w-full text-center py-10">
            No items in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResturantDetails;
