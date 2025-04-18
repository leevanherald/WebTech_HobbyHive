import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { motion } from "framer-motion";
import { GiBrain, GiMusicalNotes, GiPaintBrush } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

const iconMap = {
  intellectual: <GiBrain />,
  musical: <GiMusicalNotes />,
  artistic: <GiPaintBrush />,
};

const HobbyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedHobbies } = location.state || {};
  const [hobbyDetails, setHobbyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedHobbies || selectedHobbies.length === 0) {
    return <div>Please select at least one hobby first.</div>;
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

      console.log("All details saved successfully!");
      navigate("/home"); // Assuming '/home' is your home route
    } catch (error) {
      console.error("Error saving hobby details:", error);
      alert(error.message || "Failed to save hobby details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hobby Details</h1>
      {selectedHobbies.map((hobby) => {
        const details = hobbyDetails[hobby] || {};
        const { percent } = completionStatus[hobby] || { percent: 0 };

        return (
          <motion.div
            key={hobby}
            className="bg-white p-4 rounded-xl shadow-md mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-xl font-semibold mb-2">
              <span className="mr-2 text-2xl">{iconMap[hobby]}</span>
              {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
            </div>
            <ProgressBar percent={percent} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="School"
                className="border p-2 rounded"
                value={details.school || ""}
                onChange={(e) => handleChange(hobby, "school", e.target.value)}
              />
              <select
                value={details.experience || ""}
                onChange={(e) => handleChange(hobby, "experience", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Experience Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <textarea
                placeholder="Description"
                className="border p-2 rounded col-span-full"
                value={details.description || ""}
                onChange={(e) => handleChange(hobby, "description", e.target.value)}
              />
            </div>
          </motion.div>
        );
      })}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
};

export default HobbyDetailsPage;
