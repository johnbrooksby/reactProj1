import React from "react";
import App from "./App";
import About from "./About";
import { Routes, Route } from "react-router-dom";

const App1 = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </div>
  );
};

export default App1;
