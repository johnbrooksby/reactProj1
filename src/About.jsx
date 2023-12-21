import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import App from "./App";

const About = () => {
    
  return (
    <div>
      <h2>About</h2>
      <NavLink to="/">Return Home</NavLink>
    </div>
  );
};

export default About;
