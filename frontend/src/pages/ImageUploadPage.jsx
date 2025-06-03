import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

function ImageUploadPage() {
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const goToAnalysisPage = async () => {
    if (!selectedImageFile) {
      alert("Upload an image first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImageFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/analysis", {
          state: {
            image: previewUrl,
            ingredients: data.ingredients,
            table_text: data.table_text,
            llm_response: data.llm_response,
          },
        });
      } else {
        alert("Image analysis failed.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Server connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#b9e2f5] to-[#84cdee]">
        {/* Navbar */}
        <header className="w-full bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-3 hidden md:flex">
              <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
              <span className="text-2xl font-bold text-[#50b8e7]">NutriScan</span>
            </div>
            <nav className="w-full md:w-auto">
              <Navbar />
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
              Upload Ingredients Image
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Choose and upload an image containing food ingredients.
            </p>

            {/* Upload Input */}
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-xl transition">
                <span className="font-medium text-base">Upload Image</span>
                <span className="text-sm text-gray-500">JPG, PNG</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            )}

            {/* Image Preview */}
            {previewUrl && !isLoading && (
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Preview:
                </h3>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded-md shadow"
                />
              </div>
            )}

            {/* Analyze Button */}
            {previewUrl && !isLoading && (
              <button
                onClick={goToAnalysisPage}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Analyze Ingredients
              </button>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ImageUploadPage;
