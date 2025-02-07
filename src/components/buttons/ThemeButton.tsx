import { Moon } from "lucide-react";

const ThemeButton = () => {
  return (
    <button className="px-1 py-1 rounded-full border transition-all border-zinc-300 hover:bg-zinc-200 w-[30px] h-[30px]">
      <Moon color="#71717a" size={20} />
    </button>
  );
};

export default ThemeButton;
