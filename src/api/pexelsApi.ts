import { createClient, Photo as PexelsPhoto } from "pexels";
import { Photo } from "../types/photo";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

if (!API_KEY) {
  throw new Error("Pexels API key is not defined in the environment variables");
}

const pexelsClient = createClient(API_KEY);

const mapPexelsPhoto = (pexelsPhoto: PexelsPhoto): Photo => {
  return {
    id: pexelsPhoto.id,
    url: pexelsPhoto.url,
    photographer: pexelsPhoto.photographer,
    alt: pexelsPhoto.alt,
    src: {
      regular: pexelsPhoto.src.medium,
      large: pexelsPhoto.src.large,
      small: pexelsPhoto.src.small,
    },
  };
};

export const fetchPhotos = async (
  page: number,
  perPage: number
): Promise<Photo[]> => {
  try {
    const response = await pexelsClient.photos.curated({
      page,
      per_page: perPage,
    });
    if ("error" in response) {
      throw new Error(response.error);
    }

    return response.photos.map(mapPexelsPhoto);
  } catch (error) {
    console.error("Failed to fetch curated photos:", error);
    throw error;
  }
};

export const fetchPhotoById = async (id: number): Promise<Photo | null> => {
  try {
    const response = await pexelsClient.photos.show({ id });

    if ("error" in response) {
      throw new Error(response.error);
    }

    return mapPexelsPhoto(response);
  } catch (error) {
    console.error("Failed to fetch photo by ID:", error);
    return null;
  }
};

export default pexelsClient;
