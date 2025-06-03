import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

const AboutUs = () => {
  return (
    <div className="m-0 p-0 w-full">
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

      <div className="bg-[#f3fbfd] min-h-screen text-gray-800 ">
        {/* Hero Section */}
        <div className="bg-[#dcf0fa] py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#127c99]">
            About Us
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            Learn more about our mission, values, and the team that makes it all
            happen.
          </p>
        </div>

        {/* Mission Section */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#127c99]">
              Our Mission
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              We aim to revolutionize how users make healthier food choices by
              providing transparent insights into product ingredients. Our
              platform empowers people to take control of their well-being
              through intelligent analysis and personalized recommendations.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-vector/healthy-lifestyle-concept-illustration_114360-6547.jpg"
            alt="Mission Illustration"
            className="w-full rounded-xl shadow-lg"
          />
        </section>

        {/* Our Team Section */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#127c99] mb-10">
              Meet the Team
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {[
                { name: "Dipak Vyavahare", role: "Frontend Developer" },
                { name: "Omkar Khalkar", role: "Backend Developer" },
                { name: "Aditya Mhase", role: "ML Specialist" },
                { name: "Yashwardhan More", role: "API Integration" },
                { name: "Diapli Sakale", role: "Documentation & QA" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-[#f0f9fc] p-6 rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#50b8e7] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {member.name.split(" ")[0][0]}
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="py-12 px-6 bg-[#dcf0fa] text-center">
          <h2 className="text-2xl font-semibold mb-2 text-[#127c99]">
            Want to Know More?
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Feel free to reach out to us through our contact page.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#50b8e7] hover:bg-[#127c99] text-white py-2 px-6 rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="mt-2">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AboutUs;
