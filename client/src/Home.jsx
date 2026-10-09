import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-black">Fashion</span>
            <span className="text-pink-600">AI</span>
          </h1>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/login" className="text-gray-600 hover:text-black transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-24"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 py-28 px-6 md:px-12">

        {/* Decorative Blur Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              AI-Powered <br />
              Fashion Intelligence
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Real-time outfit recommendations based on climate, season,
              festival, and personal style preferences. Designed for
              modern fashion experiences.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
    
              <Link
                to="/dashboard"
                className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-100 transition"
              >
                View Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>✔ Climate-Aware AI</span>
              <span>✔ Occasion Intelligence</span>
              <span>✔ Personalized Styling</span>
              <span>✔ Smart Fabric Matching</span>
            </div>
          </div>

          {/* RIGHT GLASSMORPHISM CARD */}
          <div className="bg-white/60 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 border border-white/40">

            <h3 className="text-xl font-semibold mb-8">
              Live Recommendation Context
            </h3>

            <div className="space-y-5 text-gray-700">

              <div className="flex justify-between">
                <span>Climate</span>
                <span className="font-medium text-pink-600">
                  Hot • 32°C
                </span>
              </div>

              <div className="flex justify-between">
                <span>Season</span>
                <span className="font-medium">Summer</span>
              </div>

              <div className="flex justify-between">
                <span>Festival</span>
                <span className="font-medium">Diwali</span>
              </div>

              <div className="flex justify-between">
                <span>Suggested Style</span>
                <span className="font-medium">
                  Lightweight Ethnic Wear
                </span>
              </div>

            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Breathable",
                "Festive",
                "Lightweight",
                "Elegant",
                "Summer Collection"
              ].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 text-xs bg-pink-100 text-pink-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-10 w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition shadow-lg">
              Generate Recommendation
            </button>
          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h3 className="text-4xl font-bold mb-16">
            How Outfit AI Works
          </h3>

          <div className="grid md:grid-cols-3 gap-12">

            <div className="p-10 rounded-3xl border hover:shadow-2xl transition duration-300">
              <h4 className="font-semibold text-lg mb-4">
                Intelligent Data Layer
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Processes fashion images, event datasets,
                and environmental conditions.
              </p>
            </div>

            <div className="p-10 rounded-3xl border hover:shadow-2xl transition duration-300">
              <h4 className="font-semibold text-lg mb-4">
                Multi-Model Classification
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Identifies fabric, style, season compatibility,
                and occasion mapping.
              </p>
            </div>

            <div className="p-10 rounded-3xl border hover:shadow-2xl transition duration-300">
              <h4 className="font-semibold text-lg mb-4">
                Personalized Engine
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Combines user attributes with AI outputs
                to deliver ranked outfit suggestions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-50 border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} OutfitAI — Premium Fashion Intelligence Platform
      </footer>

    </div>
  );
}