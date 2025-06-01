import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#dcf0fa] text-gray-700 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-[#127c99]">NutriScan</h1>
          <p className="mt-2 text-sm">
            Empowering you with clear insights into what you eat. Scan, learn, and live better with NutriScan.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#127c99]">Contact</h2>
          <ul className="text-sm space-y-1">
            <li>Email: nutriscan@contact</li>
            <li>Location: Pune, Maharashtra, India</li>
            <li>Phone: +91 98765 43210</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#127c99]">Quick Links</h2>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:text-[#50b8e7]">Home</a></li>
            <li><a href="/scan" className="hover:text-[#50b8e7]">Scan Product</a></li>
            <li><a href="/contact" className="hover:text-[#50b8e7]">Contact</a></li>
            <li><a href="/about" className="hover:text-[#50b8e7]">About Us</a></li>
          </ul>
        </div>
      </div>

      {/* Divider and bottom text */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NutriScan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
