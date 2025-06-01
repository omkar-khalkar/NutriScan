import React from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="flex justify-center p-2">
      <ul className="flex justify-evenly min-w-[420px] h-12 items-center border-2 border-[#67C4BA] rounded-lg backdrop-blur-md text-xs font-bold text-gray-900 gap-4 px-4">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/upload">SCAN PRODUCT</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT</Link>
        </li>
        <li>
          <Link to="/about">ABOUT US</Link>
        </li>
      
      </ul>
    </div>
  );
}

export default Navbar;
