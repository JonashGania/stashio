import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

const SelectComponent = () => {
  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="sort-type">Sort by:</Label>
      <Select value="date-newest">
        <SelectTrigger id="sort-type" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-newest">Date (Newest)</SelectItem>
          <SelectItem value="date-oldest">Date (Oldest)</SelectItem>
          <SelectItem value="name-a-z">Name A-Z</SelectItem>
          <SelectItem value="name-z-a">Name Z-A</SelectItem>
          <SelectItem value="size-highest">Size (Highest)</SelectItem>
          <SelectItem value="size-lowest">Size (Lowest)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
