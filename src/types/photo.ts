export interface Photo {
  id: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    medium: string;
    [key: string]: string;
  };
  [key: string]: any;
}
