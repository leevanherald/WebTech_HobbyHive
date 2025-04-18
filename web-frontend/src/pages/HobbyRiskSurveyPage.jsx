import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HobbyRiskSurveyPage = ({ toggleChatbot, isChatbotVisible }) => {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState("");
  const [hobbyData, setHobbyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3005/gethobbies");
      const text = await response.text();
      const data = JSON.parse(text);
      const dataArray = Object.values(data);
      setHobbies(dataArray);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHobbyData = async (hobby) => {
    setSelectedHobby(hobby);
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3005/gethobbyrisk", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hobby }),
      });

      const data = await response.json();
      const numericData = Object.values(data[0]).map((value) => Number(value) || 0);
      setHobbyData(numericData);
    } catch (err) {
      console.error("Failed to fetch hobby data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ["Physical Risk", "Financial Risk", "Time Investment", "Learning Curve", "Equipment Needed"],
    datasets: [
      {
        label: "Risk Score",
        data: hobbyData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  const Navigation = () => (
    <div className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-xl">Hobby Risk Analysis</div>
        <button
          onClick={toggleChatbot}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-50 transition-colors"
        >
          {isChatbotVisible ? "Hide Support" : "Get Support"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Explore Hobby Risk Factors</h1>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Hobby:
            </label>
            <div className="relative">
              <select
                value={selectedHobby}
                onChange={(e) => getHobbyData(e.target.value)}
                className="block w-full md:max-w-md appearance-none bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              >
                <option value="">-- Select a hobby --</option>
                {hobbies.length > 0 ? (
                  hobbies.map((hobbyObj, index) => (
                    <option key={index} value={hobbyObj.hobby}>
                      {hobbyObj.hobby}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading...
                  </option>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {!isLoading && selectedHobby && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Risk Analysis: <span className="text-indigo-600">{selectedHobby}</span>
              </h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-700">
                    This chart shows various risk factors associated with {selectedHobby}. 
                    Higher scores indicate higher levels of risk or investment required.
                  </p>
                </div>
              </div>
              
              <div className="h-64 md:h-80">
                <Bar data={chartData} options={chartOptions} />
              </div>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
                {chartData.labels.map((label, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xl font-bold" style={{ color: chartData.datasets[0].backgroundColor[index].replace('0.7', '1') }}>
                      {hobbyData[index]}/10
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isLoading && !selectedHobby && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600">No hobby selected</h3>
              <p className="mt-2 text-sm text-gray-500">
                Select a hobby from the dropdown to view its risk analysis
              </p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Hobby Risk Analysis Tool © 2025</p>
          <p className="mt-1">Data provided for informational purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default HobbyRiskSurveyPage;