import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ImageUploadPage from "./pages/ImageUploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import NutritionFactsPage from "./pages/NutritionFactsPage";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";

//import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ✅ Protected Route Example: Only signed-in users can access /upload */}
      
            
      <Route path="/upload" element={<ImageUploadPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/fact" element={<NutritionFactsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutUs />} />

      {/* ✅ Clerk Auth Pages */}
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}
