import React from "react";
import { useNavigate } from "react-router-dom";
// import burger from "../assets/burger.jpg";
// import pizza from "../assets/pizza.jpg";
// import sandwich from "../assets/sandwich.jpg";
// import biryani from "../assets/biryani.jpg";
import axios from "axios";
import API_URL from "../config/apiConfig";
import { useAppData } from "../context/DataContext";

// export const resturant = [
//   {
//     id: 1,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: pizza,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 2,
//     name: "Pizza Villa",
//     rating: 4.2,
//     image: burger,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 3,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: sandwich,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 4,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: biryani,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 5,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: burger,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 6,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: pizza,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 7,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: sandwich,
//     description: "Sushi,Biryani..",
//   },
//   {
//     id: 8,
//     name: "Spice Villa",
//     rating: 4.2,
//     image: biryani,
//     description: "Sushi,Biryani..",
//   },
// ];

const Resturants = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const { resturants: resturant, foods, loading, error } = useAppData();

  if (loading) {
    return (
      <div className="px-8 py-6">
        <div className="h-8 w-1/3 mt-4 rounded bg-gray-200 animate-pulse" />
        <div className="w-full h-[60vh] mt-4 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-4 w-2/3 mt-4 rounded bg-gray-200 animate-pulse" />

        <div className="h-6 w-40 mt-8 rounded bg-gray-200 animate-pulse" />
        <div className="flex flex-wrap gap-4 mt-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"
              />
            ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 w-full sm:w-[45%] md:w-[30%]"
              >
                <div className="w-full h-40 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-16 mt-2 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-1/2 mt-2 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-1/4 mt-1 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="px-8 py-4 text-red-500">Error: {error}</p>;

  const filteredResturants = selectedCategory
    ? resturant.filter((r) =>
        foods.some(
          (f) =>
            String(f.resturant) === String(r._id) &&
            f.foodTags?.toLowerCase() === selectedCategory.toLowerCase(),
        ),
      )
    : resturant;

  return (
    <div>
      <div>
        <h1 className="px-8 py-4 text-2xl font-medium">
          Resturants {selectedCategory && `— ${selectedCategory}`}
        </h1>
        <div className="px-8 md:px-12 flex flex-wrap gap-4  ">
          {filteredResturants.length > 0 ? (
            filteredResturants.map((r) => (
              <div
                key={r._id}
                onClick={() => navigate(`/resturant/${r._id}`)}
                className="border-amber-50 rounded-lg p-3 w-full sm:w-[45%] md:w-[30%] hover:shadow-2xl"
              >
                <img
                  src={r.imageUrl}
                  alt={r.name}
                  className="w-full h-60 object-cover rounded"
                />
                <h3 className="font-bold mt-2">{r.title}</h3>
                <p className="text-sm text-gray-500">
                  {r.description} •⭐ {r.rating}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 w-full text-center py-10">
              No restaurants found for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resturants;
