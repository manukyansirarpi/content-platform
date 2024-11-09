import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchPhotoById } from "../../api/pexelsApi";
import {
  BackButton,
  Container,
  PhotoContainer,
  Photographer,
  PhotoLink,
} from "./PhotoDetails.styles";
import { Photo } from "../../types/photo";
import { fetchUnsplashPhotoById } from "../../api/unsplashApi";

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState<Photo | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source") as "pexels" | "unsplash";

  const loadPhoto = useCallback(async () => {
    try {
      if (source === "pexels") {
        const cachedPhoto = await fetchPhotoById(Number(id));
        setPhoto(cachedPhoto || null);
      } else if (source === "unsplash") {
        const cachedPhoto = await fetchUnsplashPhotoById(id!);
        setPhoto(cachedPhoto || null);
      }
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  }, [id, source]);

  useEffect(() => {
    loadPhoto();
  }, [loadPhoto]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <PhotoContainer>
        <img
          src={photo.src.large}
          alt={photo.photographer}
          loading="lazy"
          decoding="async"
        />
        <Photographer>Photographer: {photo.photographer}</Photographer>
        <PhotoLink>
          URL:{" "}
          <a href={photo.url} target="_blank" rel="noopener noreferrer">
            View on {source === "pexels" ? "Pexels" : "Unsplash"}
          </a>
        </PhotoLink>
      </PhotoContainer>
    </Container>
  );
};

export default PhotoDetail;
