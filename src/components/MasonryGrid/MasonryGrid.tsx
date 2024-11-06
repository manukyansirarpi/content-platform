import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPhotos } from "../../api/pexelsApi";

import { StyledGrid, StyledPhoto } from "./MasonryGrid.styles";
import { Photo } from "../../types/photo";

const MasonryGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const newPhotos = await fetchPhotos(page, 15);
        setPhotos((prev) => [...prev, ...newPhotos]);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    loadPhotos();
  }, [page]);

  const handlePhotoClick = (id: number) => {
    navigate(`/photo/${id}`);
  };

  return (
    <StyledGrid>
      {photos.map((photo) => (
        <StyledPhoto key={photo.id} onClick={() => handlePhotoClick(photo.id)}>
          <img src={photo.src.medium} alt={photo.photographer} loading="lazy" />
        </StyledPhoto>
      ))}
    </StyledGrid>
  );
};

export default MasonryGrid;
