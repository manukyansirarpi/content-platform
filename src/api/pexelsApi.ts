import { Photo } from "../types/photo";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

if (!API_KEY) {
  throw new Error("Pexels API key is not defined in the environment variables");
}

let photoCache: { [key: number]: Photo } = {};

export const fetchPhotos = async (
  page: number,
  perPage: number
): Promise<Photo[]> => {
  const response = await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  const data = await response.json();

  // Cache the fetched photos
  data.photos.forEach((photo: Photo) => {
    photoCache[photo.id] = photo;
  });

  return data.photos;
};

export const fetchPhotoById = async (id: number): Promise<Photo | null> => {
  // Check the cache first
  if (photoCache[id]) {
    return photoCache[id];
  }

  // Since Pexels doesn't provide a single photo endpoint, we can only return null if not in cache
  return null;
};
