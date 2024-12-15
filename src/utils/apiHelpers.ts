import { MediaData } from "@/data/types";
import { http } from "./http";
import axios from "axios";

export function getStrapiURL(path = "") {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  return `${strapiApiUrl}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${getStrapiURL()}${url}`;
}

export async function uploadImageToStrapi(file: File) {
  const formData = new FormData();
  formData.append("files", file);
  console.log(formData);
  const res = await http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const image: MediaData = res.data[0];
  return image.id;
}
export async function urlToFile(imageUrl: string, filename: string): Promise<File> {
    // Fetch the image as a binary buffer
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const file = new File([blob], filename, { type: response.headers['content-type'] });
    return file;
  }

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));
