import { createApi } from "unsplash-js";
import { Photo } from "../types/photo";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

const mapUnsplashPhoto = (unsplashPhoto: any): Photo => {
  return {
    id: unsplashPhoto.id,
    url: unsplashPhoto.links.html,
    photographer: `${unsplashPhoto.first_name} ${
      unsplashPhoto.last_name || ""
    }`.trim(),
    alt: unsplashPhoto.alt_description || "",
    src: {
      regular: unsplashPhoto.urls.regular,
      large: unsplashPhoto.urls.full,
      small: unsplashPhoto.urls.small,
    },
  };
};

// Update the search function with typings
export const searchUnsplashPhotos = async (
  query: string,
  page: number,
  perPage: number
): Promise<Photo[]> => {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
    });
    if (response.errors) {
      console.error("Error fetching photos:", response.errors);
      throw new Error("Error fetching photos from Unsplash.");
    }

    return (response.response?.results || []).map(mapUnsplashPhoto);
  } catch (error) {
    console.error("Failed to fetch photos from Unsplash:", error);
    return [];
  }
};

export const fetchUnsplashPhotoById = async (
  id: string
): Promise<Photo | null> => {
  try {
    const response = await unsplash.photos.get({ photoId: id });

    if (response.errors) {
      console.error("Error fetching photo by ID:", response.errors);
      throw new Error("Error fetching photo from Unsplash.");
    }

    return response.response ? mapUnsplashPhoto(response.response) : null;
  } catch (error) {
    console.error("Failed to fetch photo from Unsplash by ID:", error);
    return null;
  }
};
