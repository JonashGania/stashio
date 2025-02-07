import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCategories = () => {
  return [
    {
      title: "Documents",
      totalFiles: 0,
      size: 0,
      url: "/documents",
      bgColor: "#8F60FF",
      logo: "/assets/colored-document.svg",
    },
    {
      title: "Images",
      totalFiles: 0,
      size: 0,
      url: "/images",
      bgColor: "#019BA0",
      logo: "/assets/colored-images.svg",
    },
    {
      title: "Media",
      totalFiles: 0,
      size: 0,
      url: "/media",
      bgColor: "#FF7BAC",
      logo: "/assets/colored-media.svg",
    },
    {
      title: "Others",
      totalFiles: 0,
      size: 0,
      url: "/others",
      bgColor: "#4E65FB",
      logo: "/assets/colored-others.svg",
    },
  ];
};
