import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/apiConfig";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [resturants, setResturants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, foodRes] = await Promise.all([
          axios.get(`${API_URL}/api/v1/resturant/getAll`),
          axios.get(`${API_URL}/api/v1/food/getAll`),
        ]);
        setResturants(restaurantRes.data.resturants || []);
        setFoods(foodRes.data.Foods || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider value={{ resturants, foods, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => useContext(DataContext);
