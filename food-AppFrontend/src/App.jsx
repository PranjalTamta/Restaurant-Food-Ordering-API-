import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Banner from "./Components/Banner";
import Category from "./Components/Category";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Resturants from "./Components/Resturants";
import Home from "./Components/Home";
import ResturantDetails from "./Components/ResturantDetails";

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="pt-24 flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resturant/:id" element={<ResturantDetails />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
