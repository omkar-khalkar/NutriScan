import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ImageUploadPage from "./pages/ImageUploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import NutritionFactsPage from "./pages/NutritionFactsPage";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

// 👇 Import custom SignIn and SignUp components
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/upload"
          element={
            <>
              <SignedIn>
                <ImageUploadPage />
              </SignedIn>
              <SignedOut>
              <RedirectToSignIn redirectUrl="/upload" />
              </SignedOut>
            </>
          }
        />
        


        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/fact" element={<NutritionFactsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Styled Clerk Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
