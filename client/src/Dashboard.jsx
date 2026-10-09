import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import female1 from "./assets/female1.jpg";
import female2 from "./assets/female2.jpg";
import male1 from "./assets/male1.jpg";
import male2 from "./assets/male2.jpg";

export default function Dashboard() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [climate, setClimate] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pattern, setPattern] = useState("");
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  const [sleeve, setSleeve] = useState("");

  const femaleOutfits = [female1, female2];
  const maleOutfits = [male1, male2];

  const detectClimate = () => {
    const climates = ["Hot 32°C", "Cold 12°C", "Rainy 24°C", "Pleasant 26°C"];
    setClimate(climates[Math.floor(Math.random() * climates.length)]);
  };
const saveOutfit = async () => {
  await fetch("http://localhost:5000/api/users/save-outfit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      gender,
      climate,
      date,
      outfit: results[currentIndex],
    }),
  });
};
  const detectDate = () => {
    const today = new Date();
    setDate(today.toDateString());
  };

  const generateRecommendation = (selectedGender) => {
    const outfits =
      selectedGender === "Female" ? femaleOutfits : maleOutfits;
    setResults([...outfits]);
    setCurrentIndex(0);
  };

  const handleGender = (value) => {
    setGender(value);
    setStep(2);
    setLoading(true);

    setTimeout(() => {
      detectClimate();
      detectDate();
      generateRecommendation(value);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleTryAgain = () => {
    setStep(1);
    setGender("");
    setResults([]);
    setCurrentIndex(0);
    setClimate("");
    setPattern("");
    setFabric("");
    setColor("");
    setSleeve("");
  };

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % results.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 lg:px-32">
      {/* Navbar */}
      <div className="flex justify-between items-center py-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold">
          Outfit<span className="text-pink-600">AI</span>
        </h1>
        <Link to="/" className="text-gray-700 hover:text-gray-900">
          Home
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-20 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-4xl font-bold mb-6">Select Your Gender</h2>
              <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full justify-center">
                <button
                  onClick={() => handleGender("Female")}
                  className="px-12 py-4 bg-pink-600 text-white rounded-full text-lg font-medium"
                >
                  Female
                </button>
                <button
                  onClick={() => handleGender("Male")}
                  className="px-12 py-4 bg-pink-600 text-white rounded-full text-lg font-medium"
                >
                  Male
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && loading && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-20"
            >
              <h2 className="text-3xl font-semibold text-gray-800">
                🤖 Analyzing Today's Climate...
              </h2>
              <p className="mt-4 text-gray-500">
                Checking weather & date conditions
              </p>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && results.length > 0 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <h2 className="text-4xl font-bold mb-4">
                Your Personalized Outfit
              </h2>

              <div className="text-gray-600 mb-6">
                📅 {date} <br />
                🌡️ Climate: {climate}
              </div>

              {/* RECOMMENDED OUTFIT ABOVE EVERYTHING */}
              <div className="border border-gray-300 rounded-2xl p-4 mb-10 relative">
                <motion.img
                  key={currentIndex}
                  src={results[currentIndex]}
                  alt="Outfit"
                  className="w-full h-64 sm:h-96 md:h-[28rem] object-cover rounded-2xl"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />

                {results.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    >
                      ◀
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>

              {/* FILTER SECTION */}
              <div className="mb-6 text-left">
                <h3 className="font-semibold mb-2">Pattern</h3>
                {["Striped","Polka Dot","Plain","Checkered"].map(p => (
                  <label key={p} className="mr-4">
                    <input type="checkbox" /> {p}
                  </label>
                ))}

                <h3 className="font-semibold mt-4 mb-2">Fabric</h3>
                {["Cotton","Silk","Denim","Linen"].map(f => (
                  <label key={f} className="mr-4">
                    <input type="checkbox" /> {f}
                  </label>
                ))}

                <h3 className="font-semibold mt-4 mb-2">Color</h3>
                {["Red","Blue","White","Black"].map(c => (
                  <label key={c} className="mr-4">
                    <input type="checkbox" /> {c}
                  </label>
                ))}

                <h3 className="font-semibold mt-4 mb-2">Sleeve</h3>
                {["Short","Long"].map(s => (
                  <label key={s} className="mr-4">
                    <input type="checkbox" /> {s}
                  </label>
                ))}

                {/* Custom Date BELOW Recommended */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Select Custom Date</h3>
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2"
                    value={
                      date
                        ? new Date(date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setDate(new Date(e.target.value).toDateString())
                    }
                  />
                </div>
              </div>

              {/* TRY AGAIN LAST */}
              <button
                onClick={handleTryAgain}
                className="px-8 py-3 bg-pink-600 text-white rounded-full text-lg font-medium"
              >
                Try Again
              </button>
              <button
  onClick={() => {
    generateRecommendation();
    saveOutfit();
  }}
>
  Recommend Outfit
</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}