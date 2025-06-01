import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnalysisResult from "../components/AnalysisResult";

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const image = location.state?.image || "";
  const healthReport = location.state?.healthReport;

  if (!healthReport) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-500">No Analysis Data Found</h2>
        <p className="text-gray-600 mt-2">Please upload an image for analysis.</p>
        <button
          onClick={() => navigate("/upload")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload Again
        </button>
      </div>
    );
  }

  return (
    <AnalysisResult
      image={image}
      ingredients={healthReport.ingredients || []}
      positives={healthReport.positives || []}
      negatives={healthReport.negatives || []}
      score={healthReport.score || 0}
    />
  );
}

export default AnalysisPage;
