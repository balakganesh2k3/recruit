import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exam from "./apexam";
import SubmitPage from "./Exams/submit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exam />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
