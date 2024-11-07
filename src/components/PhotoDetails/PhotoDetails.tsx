import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Photo } from "pexels";
import { fetchPhotoById, fetchPhotos } from "../../api/pexelsApi";
import {
  BackButton,
  Container,
  PhotoContainer,
  Photographer,
  PhotoLink,
} from "./PhotoDetails.styles";

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const cachedPhoto = await fetchPhotoById(Number(id));
        if (cachedPhoto) {
          setPhoto(cachedPhoto);
        } else {
          // Fallback to fetch more photos if not available in cache
          const allPhotos = await fetchPhotos(1, 50);
          const selectedPhoto = allPhotos.find((p) => p.id === Number(id));
          setPhoto(selectedPhoto || null);
        }
      } catch (error) {
        console.error("Error fetching photo details:", error);
      }
    };

    loadPhoto();
  }, [id]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <PhotoContainer>
        <img src={photo.src.original} alt={photo.photographer} />
        <Photographer>Photographer: {photo.photographer}</Photographer>
        <PhotoLink>
          URL:{" "}
          <a href={photo.url} target="_blank" rel="noopener noreferrer">
            View on Pexels
          </a>
        </PhotoLink>
      </PhotoContainer>
    </Container>
  );
};

export default PhotoDetail;
