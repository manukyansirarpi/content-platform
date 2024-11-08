import React, { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

import { fetchPhotos } from "../../api/pexelsApi";
import {
  StyledGrid,
  StyledPhoto,
  StyledSearchContainer,
  StyledInput,
} from "./MasonryGrid.styles";
import useIntersectionObserver from "../../hoks/useIntersectionObserver";
import { searchUnsplashPhotos } from "../../api/unsplashApi";
import { Photo } from "../../types/photo";

const PHOTOS_PER_PAGE = 15;

const MasonryGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadPhotosWithRetry = useCallback(
    async (retryCount = 0): Promise<void> => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const newPhotos = isSearching
          ? await searchUnsplashPhotos(query, page, PHOTOS_PER_PAGE)
          : await fetchPhotos(page, PHOTOS_PER_PAGE);

        if (newPhotos && newPhotos.length > 0) {
          setPhotos((prev) => {
            const existingIds = new Set(prev.map((photo) => photo.id));
            const uniqueNewPhotos = newPhotos.filter(
              (photo) => !existingIds.has(photo.id)
            );
            return isSearching && page === 1
              ? [...uniqueNewPhotos]
              : [...prev, ...uniqueNewPhotos];
          });
        } else {
          setError("Failed to load photos");
        }
      } catch (err) {
        if (retryCount < 5) {
          console.warn("Rate limit hit, retrying...", retryCount);
          setTimeout(
            () => loadPhotosWithRetry(retryCount + 1),
            2 ** retryCount * 1000
          );
        } else {
          setError("Failed to load photos after multiple attempts");
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, isSearching, query, page]
  );

  useEffect(() => {
    if (!loading && photos.length < page * PHOTOS_PER_PAGE) {
      loadPhotosWithRetry();
    }
  }, [page, query, isSearching, loadPhotosWithRetry, loading, photos.length]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setPage(1);
        setIsSearching(true);
        setQuery(value);
        setPhotos([]);
      } else if (value.length === 0) {
        setIsSearching(false);
        setQuery("");
        setPhotos([]);
        setPage(1);
      }
    }, 800),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const loadMorePhotos = useCallback(
    debounce(() => {
      setPage((prevPage) => prevPage + 1);
    }, 1000),
    []
  );

  const handlePhotoClick = useCallback(
    (id: number, source: "pexels" | "unsplash") => {
      navigate(`/photo/${id}?source=${source}`);
    },
    [navigate]
  );

  const renderedPhotos = useMemo(
    () =>
      photos.map((photo) => (
        <StyledPhoto
          key={photo.id}
          onClick={() => handlePhotoClick(photo.id, photo.source)}
        >
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
      )),
    [photos, handlePhotoClick]
  );

  const loaderRef = useIntersectionObserver(
    loadMorePhotos,
    { threshold: 0.5 },
    loading
  );

  return (
    <div>
      <StyledSearchContainer>
        <form onSubmit={(e) => e.preventDefault()}>
          <StyledInput
            type="text"
            placeholder="Search photos..."
            onChange={handleSearchChange}
          />
        </form>
      </StyledSearchContainer>
      {error && <p>{error}</p>}
      <StyledGrid>{renderedPhotos}</StyledGrid>
      {loading && <p>Loading...</p>}
      <div ref={loaderRef} style={{ height: "20px", marginBottom: "20px" }} />
    </div>
  );
};

export default MasonryGrid;
