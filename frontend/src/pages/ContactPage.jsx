import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png"

const ContactPage = () => {
  return (
    <div className="bg-[#edf7fc] min-h-screen">
      {/* Navbar Section */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between  py-3 space-y-2 md:space-y-0">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 hidden md:block">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-bold text-[#50b8e7]">NutriScan</span>
          </div>

          {/* Navbar */}
          <nav className="w-full md:w-auto">
            <Navbar />
          </nav>
        </div>
      </header>

      {/* Main Contact Section */}
      <main className="p-4 mt-5 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">
          {/* Left: Contact Info */}
          <div className="bg-gradient-to-br from-[#84cdee] to-[#50b8e7] text-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6 text-sm">
              We'd love to hear from you. Reach out with any questions or
              feedback!
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Email:</strong> contact@nutriscan.com
              </li>
              <li>
                <strong>Phone:</strong> +91 96992 87003
              </li>
              <li>
                <strong>Location:</strong> Remote
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="hover:scale-110 transition-transform">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/facebook--v1.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="p-8 space-y-6 bg-[#dcf0fa]">
            <h3 className="text-2xl font-semibold text-gray-800">
              Send a Message
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-[#edf7fc] border border-[#b9e2f5] focus:outline-none focus:ring-2 focus:ring-[#50b8e7]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-[#edf7fc] border border-[#b9e2f5] focus:outline-none focus:ring-2 focus:ring-[#50b8e7]"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-[#edf7fc] border border-[#b9e2f5] focus:outline-none focus:ring-2 focus:ring-[#50b8e7] resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-[#50b8e7] hover:bg-[#84cdee] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
