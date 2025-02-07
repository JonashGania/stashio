import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid3X3 } from "lucide-react";
import { Rows2 } from "lucide-react";
import SelectComponent from "@/components/Select";

const Images = () => {
  return (
    <div className="pt-8 pl-5 pr-12">
      <h1 className="text-3xl font-bold text-zinc-600">Images</h1>
      <Tabs defaultValue="grid">
        <div className="pt-4 flex justify-between gap-4 items-center">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <Grid3X3 />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-1">
              <Rows2 />
              Table
            </TabsTrigger>
          </TabsList>
          <SelectComponent />
        </div>
        <TabsContent value="grid">
          <div className="pt-4">
            <p className="text-lg text-zinc-400 font-medium text-center">
              No files uploaded
            </p>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <div className="pt-4">
            <p className="text-lg text-zinc-400 font-medium text-center">
              No files uploaded
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Images;
