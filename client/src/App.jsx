import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import History from "./History";

function App() {
  return (
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />

      </Routes>
  );
}

export default App;