// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // ← This is different
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';  // Make sure to import your Tailwind CSS



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>


    <App />
  </BrowserRouter>
);
