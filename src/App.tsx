import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

const PhotoDetailsPage = lazy(() => import("./pages/PhotoDetailsPage"));
const MasonryGridPage = lazy(() => import("./pages/MasonryGridPage"));

const App: React.FC = () => (
  <Router>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MasonryGridPage />} />
          <Route path="/photo/:id" element={<PhotoDetailsPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </Router>
);

export default App;
