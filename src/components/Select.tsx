import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface SelectComponentProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const SelectComponent = ({
  sortOption,
  setSortOption,
}: SelectComponentProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="sort-type">Sort by:</Label>
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger id="sort-type" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-newest" className="focus:bg-zinc-300">
            Date (Newest)
          </SelectItem>
          <SelectItem value="date-oldest" className="focus:bg-zinc-300">
            Date (Oldest)
          </SelectItem>
          <SelectItem value="name-a-z" className="focus:bg-zinc-300">
            Name A-Z
          </SelectItem>
          <SelectItem value="name-z-a" className="focus:bg-zinc-300">
            Name Z-A
          </SelectItem>
          <SelectItem value="size-highest" className="focus:bg-zinc-300">
            Size (Highest)
          </SelectItem>
          <SelectItem value="size-lowest" className="focus:bg-zinc-300">
            Size (Lowest)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
