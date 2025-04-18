import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
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

const HobbyRiskSurveyPage = () => {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobby, setSelectedHobby] = useState("");
  const [hobbyData, setHobbyData] = useState([]);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const response = await fetch("http://localhost:3005/gethobbies");
      const text = await response.text();
      const data = JSON.parse(text);
      const dataArray = Object.values(data);
      setHobbies(dataArray);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
    }
  };

  const getHobbyData = async (hobby) => {
    setSelectedHobby(hobby);
    try {
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
      alert("Something went wrong.");
    }
  };

  const chartData = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Risk Score",
        data: hobbyData,
        backgroundColor: "rgba(34, 124, 230, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select a Hobby:
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 400 }}>
        <InputLabel id="hobby-select-label">Hobby</InputLabel>
        <Select
          labelId="hobby-select-label"
          value={selectedHobby}
          label="Hobby"
          onChange={(e) => getHobbyData(e.target.value)}
        >
          {hobbies.length > 0 ? (
            hobbies.map((hobbyObj, index) => (
              <MenuItem key={index} value={hobbyObj.hobby}>
                {hobbyObj.hobby}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Loading...</MenuItem>
          )}
        </Select>
      </FormControl>

      {selectedHobby && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedHobby} Risk Data
          </Typography>
          <Bar data={chartData} options={chartOptions} />
        </Paper>
      )}
    </Box>
  );
};

export default HobbyRiskSurveyPage;
