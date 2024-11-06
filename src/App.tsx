import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PhotoDetailsPage from "./pages/PhotoDetailsPage";
import MasonryGridPage from "./pages/MasonryGridPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MasonryGridPage />} />
      <Route path="/photo/:id" element={<PhotoDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
