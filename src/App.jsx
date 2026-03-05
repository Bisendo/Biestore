import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import pages from the "pages" folder
import MeetingAttendanceTracker from "./pages/Home";  


const App = () => {


 
  return (
      <div>
        <Routes>
          <Route path="/" element={<MeetingAttendanceTracker />} />
        </Routes>
      </div>
  );
};

export default App;
