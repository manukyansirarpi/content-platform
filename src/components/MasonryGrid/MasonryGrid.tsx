import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "pexels";
import { fetchPhotos } from "../../api/pexelsApi";

import { StyledGrid, StyledPhoto } from "./MasonryGrid.styles";
import useIntersectionObserver from "../../hoks/useIntersectionObserver";

const MasonryGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPhotos = async () => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const newPhotos = await fetchPhotos(page, 15);
        if (newPhotos) {
          setPhotos((prev) => [...prev, ...newPhotos]);
        } else {
          setError("Failed to load photos");
        }
      } catch (err) {
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  const loadMorePhotos = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const loaderRef = useIntersectionObserver(
    loadMorePhotos,
    { threshold: 1.0 },
    loading
  );

  const handlePhotoClick = (id: number) => {
    navigate(`/photo/${id}`);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <StyledGrid>
        {photos.map((photo) => (
          <StyledPhoto
            key={photo.id}
            onClick={() => handlePhotoClick(photo.id)}
          >
            <img
              src={photo.src.medium}
              alt={photo.photographer}
              loading="lazy"
            />
          </StyledPhoto>
        ))}
      </StyledGrid>
      {loading && <p>Loading...</p>}
      <div ref={loaderRef} style={{ height: "20px", marginBottom: "20px" }} />
    </div>
  );
};

export default MasonryGrid;
