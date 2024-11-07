export interface Photo {
  id: number;
  url: string;
  photographer: string;
  alt: string | null;
  src: {
    regular: string;
    large: string;
    small: string;
  };
}
