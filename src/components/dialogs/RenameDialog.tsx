"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PencilLine, LoaderCircle } from "lucide-react";
import { renameFile } from "@/actions/files";
import { useState } from "react";
import { getFileType } from "@/lib/utils";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { InfiniteDataResponse, Files } from "@/types";
import { usePathname } from "next/navigation";

interface RenameDialogProps {
  file: Files;
  userId: string | undefined;
}

const RenameDialog = ({ file, userId }: RenameDialogProps) => {
  const [newName, setNewName] = useState(file.name);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const { extension, type } = getFileType(file.name);
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const handleRename = async () => {
    if (!newName.trim()) {
      toast({
        variant: "destructive",
        title: `Invalid file name`,
        description: `File name cannot be empty.`,
      });
      return;
    }

    setLoading(true);

    const res = await renameFile(file.id, newName, extension, pathname);
    setLoading(false);

    if (res.success) {
      setOpen(false);
      toast({
        variant: "success",
        title: `File rename`,
        description: `${res.message}`,
      });

      queryClient.setQueriesData(
        { queryKey: ["files", userId, type], exact: false },
        (oldData: InfiniteData<InfiniteDataResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              Array.isArray(page)
                ? page.map((f) =>
                    f.id === file.id
                      ? { ...f, name: `${newName}.${extension}` }
                      : f
                  )
                : []
            ),
          };
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: `Failed to rename ${file.name}`,
        description: `${res.message}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-4 w-full  px-2 "
          onClick={() => setOpen(true)}
        >
          <PencilLine size={20} className="text-black dark:text-gray-200" />
          <span className="text-black font-semibold dark:text-gray-200">
            Rename
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-normal text-2xl">Rename</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Input
          type="text"
          value={newName}
          className="py-4 text-lg"
          onChange={(e) => setNewName(e.target.value)}
        />
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleRename}
            className="bg-violet-500 hover:bg-violet-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span>Saving</span>
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
