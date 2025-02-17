"use client";

import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`px-1 py-1 rounded-full border transition-all border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 w-[30px] h-[30px]`}
    >
      <Moon color="#3f3f46" size={20} />
      {/* {theme === "light" ? (
        
      ) : (
        <SunMedium color="#e5e7eb" size={20} />
      )} */}
    </button>
  );
};

export default ThemeButton;
