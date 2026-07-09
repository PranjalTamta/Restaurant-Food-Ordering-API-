import React from "react";
import { menu } from "./ResturantDetails";

const VegBadge = ({ isVeg }) => {
  const color = isVeg ? "border-green-600" : "border-red-600";
  const dot = isVeg ? "bg-green-600" : "bg-red-600";
  return <span title={isVeg ? "Veg" : "Non-Veg"}></span>;
};

export default VegBadge;
