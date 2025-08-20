import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  Music,
  Files,
} from "lucide-react";

export const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Documents",
    icon: FileText,
    url: "/documents",
  },
  {
    name: "Images",
    icon: Image,
    url: "/images",
  },
  {
    name: "Videos",
    icon: Video,
    url: "/videos",
  },
  {
    name: "Audio",
    icon: Music,
    url: "/audio",
  },
  {
    name: "Others",
    icon: Files,
    url: "/others",
  },
];

export const maxFileSize = 50 * 1024 * 1024;
