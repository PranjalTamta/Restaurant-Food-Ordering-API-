import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-400 flex flex-wrap justify-between gap-8 p-8 ">
      <h4 className="text-orange-500 text-3xl font-bold">FoodFlow</h4>

      <div>
        <h5 className="font-bold mb-2">About</h5>
        <p className="text-md  hover:text-gray-500">
          FoodFlow delivers great food, fast
        </p>
      </div>
      <div>
        <h5 className="font-bold mb-2">Quick Links</h5>
        <ul className="text-sm text-gray-400 space-y-1 ">
          <li>Home</li>
          <li>Resturants</li>
          <li>About us</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-2">Contact</h4>
        <p className="text-sm text-gray-400 hover:text-gray-500">
          support@foodflow.com
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-2">Follow Us</h4>
        <p className="text-sm text-gray-400 ">Instagram • Twitter • Facebook</p>
      </div>
    </footer>
  );
};

export default Footer;
