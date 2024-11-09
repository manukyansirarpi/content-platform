import { fetchPhotos } from "./pexelsApi";
import { searchUnsplashPhotos } from "./unsplashApi";

export const fetchPhotosBySource = async (
  source: string,
  term: string | null,
  page: number,
  PHOTOS_PER_PAGE: number
) => {
  if (source === "unsplash" && term) {
    return await searchUnsplashPhotos(term, page, PHOTOS_PER_PAGE);
  } else {
    return await fetchPhotos(page, PHOTOS_PER_PAGE);
  }
};

export const handleNewPhotos = (
  newPhotos: any[],
  source: string,
  page: number,
  setPhotos: Function
) => {
  setPhotos((prevPhotos: any[]) => {
    const existingIds = new Set(prevPhotos.map((photo) => photo.id));
    const uniqueNewPhotos = newPhotos.filter(
      (photo) => !existingIds.has(photo.id)
    );
    return source === "unsplash" && page === 1
      ? [...uniqueNewPhotos]
      : [...prevPhotos, ...uniqueNewPhotos];
  });
};
