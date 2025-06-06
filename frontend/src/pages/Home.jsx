import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Bubble from "../components/Bubble";
import packegManImg from "../assets/packet-man-img.png";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/upload");
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-r from-[#E7F6F2] to-[#CDEDF6] overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute h-[900px] w-[900px] -top-[300px] -right-[200px] z-0 opacity-20">
          <Bubble />
        </div>
        <div className="absolute h-[300px] w-[300px] -bottom-[140px] left-[5px] z-0 opacity-20">
          <Bubble />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Header */}
          <header className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
                <span className="text-2xl font-semibold text-gray-900 hidden md:inline-block">
                  NutriScan
                </span>
              </div>
              <Navbar />
            </div>
          </header>

          {/* Hero Content */}
          <main className="flex-grow flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <section className="text-center lg:text-left lg:w-1/2 space-y-6">
              <p className="text-2xl sm:text-3xl text-gray-700 font-medium">
                Let’s unlock the secrets of packed food ingredients with
              </p>
              <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#1F2937]">
                NutriScan
              </h1>
              <button
                onClick={handleGetStarted}
                className="text-white bg-gradient-to-r from-[#57C3AE] to-[#8dc1e1] px-8 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition duration-200"
              >
                Get Started
              </button>
            </section>

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

      {/* Quote Section */}
      <section className="bg-white py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 h-16 w-16 bg-orange-400 rounded z-0"></div>
        <div className="absolute bottom-10 right-16 h-8 w-8 bg-orange-500 rounded z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full bg-orange-400 text-white text-3xl font-bold">
            “
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug">
            "NutriScan empowers you to <span className="text-orange-500">decode food labels</span> with ease,
            giving you the <span className="text-orange-500">confidence</span> to choose wisely and live healthier."
          </p>
          <p className="mt-4 text-gray-500 font-medium">— The NutriScan Team</p>
        </div>

        {/* Secondary Message */}
        <div className="mt-20 bg-gray-50 py-12 px-6 sm:px-10 lg:px-16 rounded-xl shadow-inner text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Perfect fusion of technology and nutrition
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            We combine cutting-edge OCR and AI to scan, interpret, and simplify food ingredient data — all in one click.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#F5FAFC] py-16 px-4 sm:px-10 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center">
            Why NutriScan is your smartest food companion.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-2">Scan & Decode</h3>
              <p className="text-gray-600 text-sm">
                Instantly scan any food label — NutriScan extracts and interprets it for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-gray-600 text-sm">
                Understand what's inside using intelligent analysis of ingredients and nutrition.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2">Allergen Alert</h3>
              <p className="text-gray-600 text-sm">
                Automatically detect common allergens like gluten, soy, nuts, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Picks</h3>
              <p className="text-gray-600 text-sm">
                Tailored advice for your lifestyle: vegan, keto, diabetic or balanced.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
