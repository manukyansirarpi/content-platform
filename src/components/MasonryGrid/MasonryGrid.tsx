import React, { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

import { fetchPhotos } from "../../api/pexelsApi";

import { StyledGrid, StyledPhoto } from "./MasonryGrid.styles";
import useIntersectionObserver from "../../hoks/useIntersectionObserver";
import { searchUnsplashPhotos } from "../../api/unsplashApi";
import { Photo } from "../../types/photo";

const MasonryGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPhotosWithRetry = async (retryCount = 0): Promise<void> => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const newPhotos = isSearching
          ? await searchUnsplashPhotos(query, page, 15)
          : await fetchPhotos(page, 15);
        if (newPhotos) {
          setPhotos((prev) =>
            isSearching && page === 1 ? [...newPhotos] : [...prev, ...newPhotos]
          );
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
    };

    loadPhotosWithRetry();
  }, [page, query, isSearching]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setPage(1);
        setIsSearching(true);
        setQuery(value);
        setPhotos([]); // Clear existing photos when starting a new search
      }
    }, 500),
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
    (id: number) => {
      navigate(`/photo/${id}`);
    },
    [navigate]
  );

  const renderedPhotos = useMemo(
    () =>
      photos.map((photo) => (
        <StyledPhoto key={photo.id} onClick={() => handlePhotoClick(photo.id)}>
          <img
            src={photo.src.regular}
            alt={photo.photographer}
            loading="lazy"
          />
        </StyledPhoto>
      )),
    [photos, handlePhotoClick]
  );

  const loaderRef = useIntersectionObserver(
    loadMorePhotos,
    { threshold: 1.0 },
    loading
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search photos..."
          onChange={handleSearchChange}
        />
      </form>
      {error && <p>{error}</p>}
      <StyledGrid>{renderedPhotos}</StyledGrid>
      {loading && <p>Loading...</p>}
      <div ref={loaderRef} style={{ height: "20px", marginBottom: "20px" }} />
    </div>
  );
};

export default MasonryGrid;
