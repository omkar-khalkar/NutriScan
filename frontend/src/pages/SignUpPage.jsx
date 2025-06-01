import { SignUp } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

const SignUpPage = () => {
  return (
    <>
      <header className="w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#50b8e7] via-[#b9e2f5] to-[#edf7fc]">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              card: "bg-transparent shadow-none",
              headerTitle: "text-[#2c3e50] text-xl font-semibold mb-2",
              headerSubtitle: "text-[#4a6b82]",
              formButtonPrimary:
                "bg-[#50b8e7] hover:bg-[#84cdee] text-white font-medium rounded-md transition duration-300",
              socialButtonsBlockButton:
                "bg-white hover:bg-[#edf7fc] text-[#2c3e50] border border-[#dcf0fa] rounded-md shadow-sm transition duration-300",
              footerActionText: "text-[#4a6b82]",
              footerActionLink:
                "text-[#50b8e7] hover:text-[#84cdee] font-medium",
            },
          }}
        />
      </div>
    </>
  );
};

export default SignUpPage;
