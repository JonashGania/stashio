"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Trash2, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { deleteFile } from "@/actions/files";
import { getFileType } from "@/lib/utils";
import { InfiniteDataResponse, Files } from "@/types";
import { usePathname } from "next/navigation";

interface DeleteDialogProps {
  file: Files;
  userId: string | undefined;
}

const DeleteDialog = ({ file, userId }: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const category = getFileType(file.name).type;
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const handleDeleteFile = async () => {
    setLoading(true);

    const res = await deleteFile(file.id, userId, file.fileId, pathname);
    setLoading(false);

    if (res.success) {
      setOpen(false);
      toast({
        variant: "success",
        title: `Delete file`,
        description: `${res.message}`,
      });

      queryClient.setQueriesData(
        { queryKey: ["files", userId, category], exact: false },
        (oldData: InfiniteData<InfiniteDataResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              Array.isArray(page) ? page.filter((f) => f.id !== file.id) : []
            ),
          };
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: `Failed to delete ${file.name}`,
        description: `${res.message}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-4 w-full px-2"
          onClick={() => setOpen(true)}
        >
          <Trash2 size={20} className="text-black dark:text-gray-200" />
          <span className="text-black font-semibold dark:text-gray-200">
            Delete
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-sm py-4 px-6">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl text-red-500">
            Delete
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-gray-200">
          Are you sure you want to delete this file? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteFile}
            className="bg-red-500 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span>Deleting</span>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
