import { StrictMode } from "react";
import React from "react"; // ✅ Add this line

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Buffer } from "buffer";
window.Buffer = Buffer; // For browser environments
import { inherits } from "util";
import process from "process";

// Provide polyfills for missing Node.js globals
window.process = process;
window.inherits = inherits;
import util from "util";
// import process from "process";
import stream from "stream-browserify";

// Provide polyfills for missing Node.js globals
window.util = util;
window.process = process;
window.stream = stream;

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);