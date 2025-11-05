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
import { Button } from "../ui/button";
import { Trash2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { multipleDeleteFiles } from "@/actions/files";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { InfiniteDataResponse } from "@/types";

interface DeleteSelectedButtonProps {
  fileIds: string[];
  userId: string | undefined;
  refetchFiles: () => void;
  setSelectedFiles: (files: string[]) => void;
}

const DeleteSelectedButton = ({
  fileIds,
  userId,
  refetchFiles,
  setSelectedFiles,
}: DeleteSelectedButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleMultipleDelete = async () => {
    setLoading(true);

    const res = await multipleDeleteFiles(fileIds, userId);
    setLoading(false);

    if (res.success) {
      setOpen(false);
      toast({
        variant: "success",
        title: `Delete file`,
        description: `${res.message}`,
      });

      queryClient.setQueriesData(
        { queryKey: ["files", userId], exact: false },
        (oldData: InfiniteData<InfiniteDataResponse> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              Array.isArray(page)
                ? page.filter((f) => !fileIds.includes(f.id))
                : []
            ),
          };
        }
      );
      setSelectedFiles([]);
      refetchFiles();
    } else {
      toast({
        variant: "destructive",
        title: `Failed to delete files`,
        description: `${res.message}`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Trash2 size={20} className="text-red-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-sm py-4 px-6">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl text-red-500">
            Delete?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-gray-200">
          Are you sure you want to delete these files? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleMultipleDelete}
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

export default DeleteSelectedButton;
