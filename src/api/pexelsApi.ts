import { createClient, Photo } from "pexels";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

if (!API_KEY) {
  throw new Error("Pexels API key is not defined in the environment variables");
}

const pexelsClient = createClient(API_KEY);

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

    return response.photos;
  } catch (error) {
    console.error("Failed to fetch curat≈ed photos:", error);
    throw error;
  }
};

export const fetchPhotoById = async (id: number) => {
  try {
    const response = await pexelsClient.photos.show({ id });

    if ("error" in response) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.error("Failed to fetch photo by ID:", error);
    return null;
  }
};

export default pexelsClient;
