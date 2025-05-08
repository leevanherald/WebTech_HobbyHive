import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiBrain, GiMusicalNotes, GiPaintBrush } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const iconMap = {
  intellectual: <GiBrain className="text-indigo-600" />,
  musical: <GiMusicalNotes className="text-purple-600" />,
  artistic: <GiPaintBrush className="text-pink-600" />,
};

const experienceLevels = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const HobbyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedHobbies } = location.state || {};
  const [hobbyDetails, setHobbyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedHobbies || selectedHobbies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">No Hobbies Selected</h2>
          <p className="text-gray-600 mb-6">
            Please go back and select at least one hobby to continue.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (hobby, field, value) => {
    setHobbyDetails((prev) => ({
      ...prev,
      [hobby]: {
        ...prev[hobby],
        [field]: value,
      },
    }));
  };

  const completionStatus = selectedHobbies.reduce((acc, hobby) => {
    const details = hobbyDetails[hobby] || {};
    const filledFields = [
      details.school?.trim(),
      details.description?.trim(),
      details.experience,
    ].filter(Boolean);
    acc[hobby] = {
      isComplete: filledFields.length === 3,
      percent: Math.round((filledFields.length / 3) * 100),
    };
    return acc;
  }, {});

  const allComplete = selectedHobbies.every(
    (hobby) => completionStatus[hobby]?.isComplete
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await Promise.all(
        Object.keys(hobbyDetails).map(async (hobby) => {
          const response = await fetch("http://localhost:3005/saveHobbyDetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              hobby: hobby,
              school: hobbyDetails[hobby]?.school || "",
              description: hobbyDetails[hobby]?.description || "",
              experience: hobbyDetails[hobby]?.experience || "",
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(`Failed to save details for ${hobby}: ${data.message}`);
          }
        })
      );

      navigate("/home", { state: { success: true } });
    } catch (error) {
      console.error("Error saving hobby details:", error);
      alert(error.message || "Failed to save hobby details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-indigo-800 mb-8"
        >
          Tell Us More About Your Hobbies
        </motion.h1>

        <div className="space-y-6">
          {selectedHobbies.map((hobby) => {
            const details = hobbyDetails[hobby] || {};
            const { percent } = completionStatus[hobby] || { percent: 0 };

            return (
              <motion.div
                key={hobby}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 rounded-full mr-3">
                      {iconMap[hobby]}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    {percent}% Complete
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School/Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Where did you learn this?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                      value={details.school || ""}
                      onChange={(e) => handleChange(hobby, "school", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      value={details.experience || ""}
                      onChange={(e) => handleChange(hobby, "experience", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                    >
                      <option value="">Select your level</option>
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Tell us about your experience with this hobby..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all min-h-[100px]"
                      value={details.description || ""}
                      onChange={(e) => handleChange(hobby, "description", e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !allComplete}
            className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${
              allComplete
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            whileHover={allComplete ? { scale: 1.02 } : {}}
            whileTap={allComplete ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save All Hobbies"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HobbyDetailsPage;