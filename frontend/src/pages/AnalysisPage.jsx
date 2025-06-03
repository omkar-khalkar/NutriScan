import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png"

const AnalysisPage = () => {
  const location = useLocation();
  const { image, ingredients, llm_response } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedNutrientIndex, setExpandedNutrientIndex] = useState(null);

  if (!image || !ingredients || !llm_response) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 text-lg font-semibold">
        <p>⚠️ Missing analysis data. Please upload an image first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2]">
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 space-y-2 md:space-y-0">
            {/* Logo & Brand Name */}
            <div className="flex items-center space-x-3 hidden md:flex">
              <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
              <span className="text-2xl font-bold text-[#50b8e7]">
                NutriScan
              </span>
            </div>

            {/* Navbar */}
            <nav className="w-full md:w-auto">
              <Navbar />
            </nav>
          </div>
        </header>

      <main className="max-w-6xl mx-auto py-10 px-5 sm:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-gray-800">
          🧪 Nutrition Analysis Report
        </h2>

        {/* Image Preview */}
        <div className="mb-6 flex justify-center">
          <img
            src={image}
            alt="Uploaded"
            onClick={() => setIsModalOpen(true)}
            className="w-52 sm:w-64 md:w-72 lg:w-80 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Overall Score Card */}
        <div className="mb-10 flex justify-center">
          <div className="bg-gradient-to-r from-green-200 to-teal-200 text-gray-800 px-6 py-4 rounded-2xl shadow-lg w-full max-w-xl text-center border border-teal-300 animate-fade-in">
            <h4 className="text-lg sm:text-xl font-semibold mb-1">🌟 Overall Ingredient Score</h4>
            <p className="text-2xl sm:text-3xl font-extrabold text-teal-700">
              {llm_response.product.score.label} (
              {llm_response.product.score.value}/{llm_response.product.score.out_of})
            </p>
            <p className="mt-2 text-sm sm:text-base text-gray-700">
              This score represents the overall health impact based on the listed ingredients.
            </p>
          </div>
        </div>

        {/* Modal for enlarged image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative">
              <img
                src={image}
                alt="Enlarged"
                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Ingredients Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            🥗 Ingredients & Health Impact
          </h3>
          <div className="bg-white rounded-xl p-6 shadow-lg text-gray-800 max-h-72 overflow-y-auto space-y-4 text-sm sm:text-base">
            {llm_response.product.ingredients.map((item, idx) => (
              <div key={idx} className="border-b pb-2">
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-700">{item.health_impact}</p>
              </div>
            ))}
            <div className="pt-4">
              <p className="font-medium">
                <strong>Overall Score:</strong>{" "}
                {llm_response.product.score.label} (
                {llm_response.product.score.value}/
                {llm_response.product.score.out_of})
              </p>
            </div>
          </div>
        </section>

        {/* Nutrients Section */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">💪 Nutrients</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {llm_response?.nutrients?.map((nutrient, idx) => {
              const isOpen = expandedNutrientIndex === idx;
              const toggleOpen = () =>
                setExpandedNutrientIndex(isOpen ? null : idx);

              const statusColor =
                nutrient.status === "good"
                  ? "bg-green-100 border-green-300"
                  : nutrient.status === "bad"
                  ? "bg-red-100 border-red-300"
                  : "bg-gray-100 border-gray-300";

              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] ${statusColor}`}
                  onClick={toggleOpen}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {nutrient.name}
                    </h4>
                    <span className="text-xl font-bold text-gray-600">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Per 100g:</strong> {nutrient.value_per_100g}
                  </p>

                  {isOpen && (
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Description:</strong> {nutrient.description}
                      </p>
                      <p>
                        <strong>Health Impact:</strong> {nutrient.health_impact}
                      </p>
                      <p>
                        <strong>Safe Limit:</strong>{" "}
                        {nutrient.daily_safe_limit}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AnalysisPage;
