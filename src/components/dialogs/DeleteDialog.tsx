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
import { Files } from "@/types";
import { getFileType } from "@/lib/utils";
import { InfiniteDataResponse } from "@/types";

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

  const handleDeleteFile = async () => {
    setLoading(true);

    const res = await deleteFile(file.id, userId, file.fileId);
    setLoading(false);

    if (res.success) {
      setOpen(false);
      toast({
        variant: "success",
        title: `Delete file`,
        description: `${res.message}`,
      });

      queryClient.setQueryData(
        ["recentUploads", userId],
        (oldFiles: Files[] | undefined) => {
          if (!oldFiles) return oldFiles;
          return oldFiles.filter((f) => f.id !== file.id);
        }
      );

      queryClient.setQueriesData(
        { queryKey: ["files", userId, category], exact: false },
        (oldData: InfiniteData<InfiniteDataResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.filter((f) => f.id !== file.id)
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
          className="flex items-center gap-[6px] w-full"
          onClick={() => setOpen(true)}
        >
          <Trash2 size={16} />
          <span className="text-zinc-600">Delete</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-normal text-2xl text-red-500">
            Delete
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
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
            className="bg-red-500 hover:bg-red-700"
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
