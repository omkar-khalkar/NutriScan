import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png"

function ImageUploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
      alert("Please allow camera access.");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      setSelectedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const goToAnalysisPage = async () => {
    if (!selectedImage) {
      alert("Upload or scan an image first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/img", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: selectedImage }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/analysis", {
          state: {
            image: selectedImage,
            healthReport: data.healthReport,
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
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between  py-3 space-y-2  md:space-y-0">
            {/* Logo & Brand Name */}
            <div className="flex items-center space-x-3 hidden md:block">
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

        {/* Main */}
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
              Upload or Scan Ingredients
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Choose to upload an image or use your camera to scan ingredients
              live.
            </p>

            {/* Camera View */}
            {isCameraActive && (
              <div className="relative mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full rounded-lg shadow-md"
                />
                <button
                  onClick={captureImage}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-blue-400 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
                >
                  Capture
                </button>
              </div>
            )}

            {/* Upload or Activate Camera */}
            {!isCameraActive && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <label className="flex flex-col items-center justify-center w-full sm:w-1/2 p-6 border-2 border-dashed border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-xl transition">
                  <span className="font-medium text-base">Upload Image</span>
                  <span className="text-sm text-gray-500">JPG, PNG</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <span className="text-gray-500 font-semibold">OR</span>

                <button
                  onClick={activateCamera}
                  className="w-full sm:w-1/2 p-6 border-2 border-dashed border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                  <span className="font-medium text-base">
                    Scan from Camera
                  </span>
                </button>
              </div>
            )}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            )}

            {/* Preview */}
            {selectedImage && !isLoading && (
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Preview:
                </h3>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full rounded-md shadow"
                />
              </div>
            )}

            {/* Analyze Button */}
            {selectedImage && !isLoading && (
              <button
                onClick={goToAnalysisPage}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Analyze Ingredients
              </button>
            )}
          </div>
        </main>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default ImageUploadPage;
