import { useState } from "react";
import Banner from "./Banner";
import Category from "./Category";
import Resturants from "./Resturants";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <Banner />
      <div className="py-4">
        <Category
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="mb-8">
        <Resturants selectedCategory={selectedCategory} />
      </div>
    </>
  );
};

export default Home;
