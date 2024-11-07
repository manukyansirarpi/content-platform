import React from "react";
import PhotoDetail from "../components/PhotoDetails/PhotoDetails";
import ErrorBoundary from "../components/ErrorBoundary";

const PhotoDetailsPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <PhotoDetail />
    </ErrorBoundary>
  );
};

export default PhotoDetailsPage;
