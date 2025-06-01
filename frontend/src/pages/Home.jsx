import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Bubble from "../components/Bubble";
import packegManImg from "../assets/packet-man-img.png";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate("/upload"); // Navigate to the ImageUploadPage
  };

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-r from-[#EBF3F5] to-[#C5E2F0] overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute h-[900px] w-[900px] -top-[300px] -right-[200px] z-0">
          <Bubble />
        </div>
        <div className="absolute h-[300px] w-[300px] -bottom-[140px] left-[5px] z-0">
          <Bubble />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Header Section */}
          <header className="w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              {/* Logo and Title */}
              <div className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-2xl font-semibold text-gray-900 hidden md:inline-block">
                  NutriScan
                </span>
              </div>

              {/* Navbar */}
              <nav className="flex items-center">
                <Navbar />
              </nav>
            </div>
          </header>

          {/* Main Content Section */}
          <main className="flex-grow flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Text Section */}
            <section className="text-center lg:text-left lg:w-1/2 space-y-6">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 leading-tight">
                LET’S UNLOCK THE SECRETS OF PACKED FOOD INGREDIENTS WITH
              </p>
              <h1 className="font-bold text-5xl sm:text-6xl lg:text-8xl text-gray-900">
                NUTRISCAN
              </h1>
              <button
                onClick={handleGetStarted} // Add onClick handler
                className="text-sm font-semibold text-white bg-gradient-to-bl to-[#50b4aa] from-[#8dc1e1] px-8 py-3 rounded-lg border-2 border-[#67C4BA] hover:opacity-90 transition-opacity"
              >
                GET STARTED
              </button>
            </section>

            {/* Image Section */}
            <section className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
              <img
                src={packegManImg}
                alt="Man observing content of food packet"
                className="w-full max-w-md lg:max-w-lg"
              />
            </section>
          </main>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
