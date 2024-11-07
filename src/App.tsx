import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PhotoDetailsPage from "./pages/PhotoDetailsPage";
import MasonryGridPage from "./pages/MasonryGridPage";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<MasonryGridPage />} />
        <Route path="/photo/:id" element={<PhotoDetailsPage />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
