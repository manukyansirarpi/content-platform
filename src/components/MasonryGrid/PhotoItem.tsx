import React from "react";
import { StyledPhoto } from "./MasonryGrid.styles";
import { Photo } from "../../types/photo";

interface PhotoItemProps {
  photo: Photo;
  onClick: (id: number) => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onClick }) => (
  <StyledPhoto key={photo.id} onClick={() => onClick(photo.id)}>
    <img
      src={photo.src.small}
      srcSet={`${photo.src.small} 300w, ${photo.src.regular} 768w, ${photo.src.large} 1200w`}
      sizes="(max-width: 600px) 300px, (max-width: 1024px) 768px, 1200px"
      alt={photo.alt || "Photo"}
      loading="lazy"
      decoding="async"
      width="300"
    />
  </StyledPhoto>
);

export default PhotoItem;
