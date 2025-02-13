import { Files } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Ellipsis, EllipsisVertical, Download, Trash2 } from "lucide-react";
import DetailsDialog from "./dialogs/DetailsDialog";
import RenameDialog from "./dialogs/RenameDialog";

interface DropdownActionProps {
  layout: string;
  files: Files;
  userId: string;
}

const DropdownAction = ({ layout, files, userId }: DropdownActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {layout === "table" ? (
            <Ellipsis size={15} color="#52525b " />
          ) : (
            <EllipsisVertical size={20} color="#3f3f46" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 shadow-zinc-400 shadow">
        <DropdownMenuItem
          className="focus:bg-zinc-300"
          onSelect={(e) => e.preventDefault()}
        >
          <DetailsDialog file={files} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-zinc-300"
          onSelect={(e) => e.preventDefault()}
        >
          <RenameDialog file={files} userId={userId} />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-zinc-300">
          <Download />
          <span className="text-zinc-600">Download</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-zinc-300">
          <Trash2 />
          <span className="text-zinc-600">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
