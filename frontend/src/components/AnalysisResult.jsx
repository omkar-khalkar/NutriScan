import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather"; // Import icons for dropdown
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // Import CircularProgressbar
import "react-circular-progressbar/dist/styles.css"; // Import styles
import Navbar from "../components/Navbar"; // Import the Navbar component
import Bubble from "./Bubble";

function AnalysisResult({ image, ingredients, positives, negatives, score }) {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return "#10B981"; // Green
    if (score >= 50) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  // Function to calculate the position of the pin on the range bar
  const calculatePinPosition = (value, safeLimit) => {
    const numericValue = parseFloat(value);
    const numericLimit = parseFloat(safeLimit);
    return Math.min((numericValue / numericLimit) * 100, 100); // Cap at 100%
  };

  // Join ingredients into a single paragraph
  const ingredientsParagraph = ingredients.join(", ");

  return (
    <div className=" w-full w-full bg-gradient-to-r from-[#EBF3F5] to-[#C5E2F0] flex flex-col">
      {/* Navbar */}
      
      <header className="w-full flex justify-center mt-4 items-center  ">
        
        <div className=" flex items-center space-x-4">
          <Navbar />
        </div>
      </header>

      {/* Analysis Results Header */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 mx-auto mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Analysis Results
        </h1>

        {/* Score Card */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32">
            <CircularProgressbar
              value={score}
              text={`${score}`}
              styles={buildStyles({
                pathColor: getScoreColor(score),
                textColor: getScoreColor(score),
                textSize: "24px",
                trailColor: "#E5E7EB",
              })}
            />
          </div>
          <p className="text-lg text-gray-700 mt-2">Good</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Uploaded Image */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Uploaded Image
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={image}
                alt="Uploaded Ingredient List"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Ingredients List */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">{ingredientsParagraph}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Positives & Negatives */}
      {[
        { title: "Positives", items: positives, color: "green" },
        { title: "Negatives", items: negatives, color: "red" },
      ].map(({ title, items, color }, sectionIndex) => (
        <div key={sectionIndex} className="w-full max-w-4xl mx-auto mt-6">
          <h2 className={`text-2xl font-bold text-${color}-600 mb-4`}>
            {title}
          </h2>
          {items.map((item, index) => (
            <div
              key={index}
              className={`bg-${color}-50 p-4 rounded-lg shadow-md mb-4 cursor-pointer transition-all duration-300 hover:shadow-lg`}
              onClick={() => toggleExpand(`${title}-${index}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.icon} alt={item.name} className="w-8 h-8" />
                  <span className={`text-lg font-medium text-${color}-800`}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold text-${color}-800`}>
                    {item.value}
                  </span>
                  {expanded === `${title}-${index}` ? (
                    <ChevronUp className="text-gray-600" />
                  ) : (
                    <ChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>
              {expanded === `${title}-${index}` && (
                <div className="mt-4 pl-12 text-gray-700">
                  <p>{item.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0</span>
                      <span>Safe Limit: {item.safeLimit}</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className={`absolute h-2 bg-${color}-500 rounded-full`}
                        style={{
                          width: `${calculatePinPosition(
                            item.value,
                            item.safeLimit
                          )}%`,
                        }}
                      ></div>
                      <div
                        className="absolute w-2 h-4 bg-gray-800 rounded-full -mt-1"
                        style={{
                          left: `${calculatePinPosition(
                            item.value,
                            item.safeLimit
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnalysisResult;
