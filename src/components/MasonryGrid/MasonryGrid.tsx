import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import debounce from "lodash/debounce";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";

import PhotoItem from "./PhotoItem";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import SearchForm from "./SearchForm";

import { StyledGrid, Loader } from "./MasonryGrid.styles";

import { Photo } from "../../types/photo";
import { fetchPhotosBySource, handleNewPhotos } from "../../api/photoApis";

const PHOTOS_PER_PAGE = 15;

const usePhotoState = (initialTerm: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);

  return {
    photos,
    setPhotos,
    page,
    setPage,
    loading,
    setLoading,
    error,
    setError,
    searchTerm,
    setSearchTerm,
  };
};

const MasonryGrid: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source") || "pexels";
  const term = queryParams.get("term") || "";

  const {
    photos,
    setPhotos,
    page,
    setPage,
    loading,
    setLoading,
    error,
    setError,
    searchTerm,
    setSearchTerm,
  } = usePhotoState(term);

  const handleErrorAndRetry = (
    err: any,
    retryCount: number,
    loadPhotosWithRetry: Function,
    setError: Function
  ) => {
    if (retryCount < 5) {
      console.warn("Rate limit hit, retrying...", retryCount);
      const retryDelay = 2 ** retryCount * 1000;
      setTimeout(() => loadPhotosWithRetry(retryCount + 1), retryDelay);
    } else {
      setError("Failed to load photos after multiple attempts");
    }
  };

  const loadPhotosWithRetry = useCallback(
    async (retryCount = 0): Promise<void> => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const newPhotos = await fetchPhotosBySource(
          source,
          term,
          page,
          PHOTOS_PER_PAGE
        );

        if (newPhotos?.length) {
          handleNewPhotos(newPhotos, source, page, setPhotos);
        } else {
          setError("Failed to load photos");
        }
      } catch (err) {
        handleErrorAndRetry(err, retryCount, loadPhotosWithRetry, setError);
      } finally {
        setLoading(false);
      }
    },
    [loading, source, term, page]
  );

  useEffect(() => {
    if (!loading && photos.length < page * PHOTOS_PER_PAGE) {
      loadPhotosWithRetry();
    }
  }, [page, term, source, loadPhotosWithRetry]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setPage(1);
        setPhotos([]);
        navigate(`?source=unsplash&term=${value}`);
      } else if (value.length === 0) {
        setPhotos([]);
        setPage(1);
        navigate(`?source=pexels`);
      }
    }, 800),
    [navigate]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const loadMorePhotos = useCallback(
    debounce(() => {
      setPage((prevPage) => prevPage + 1);
    }, 1000),
    []
  );

  const handlePhotoClick = useCallback(
    (id: number) => {
      navigate(`/photo/${id}?source=${source}`);
    },
    [navigate, source]
  );

  const renderedPhotos = useMemo(
    () =>
      photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} onClick={handlePhotoClick} />
      )),
    [photos, handlePhotoClick]
  );

  const loaderRef = useIntersectionObserver(
    loadMorePhotos,
    { threshold: 0.5 },
    loading
  );

  return (
    <React.Fragment>
      <SearchForm
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      {error && <ErrorMessage error={error} />}
      <StyledGrid>{renderedPhotos}</StyledGrid>
      {loading && <LoadingMessage />}
      <Loader ref={loaderRef} />
    </React.Fragment>
  );
};

export default MasonryGrid;
