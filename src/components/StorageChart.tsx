"use client";

import { useState } from "react";
import { Progress } from "./ui/progress";

const StorageChart = () => {
  const totalStorage = 5; // total storage in GB
  const [usedStorage, setUsedStorage] = useState(0); // used storage in GB

  // percentage of used storage
  const usedPercentage = (usedStorage / totalStorage) * 100;

  return (
    <div>
      <h3 className="text-xl text-zinc-700 font-semibold">Availabe Storage</h3>
      <span className="text-sm text-zinc-600">0 GB of 5 GB used</span>
      <Progress
        value={usedPercentage}
        className="w-full [&>*]:bg-violet-500 mt-2"
        max={100}
      />
      <span className="text-sm text-zinc-600">{usedPercentage}% available</span>
    </div>
  );
};

export default StorageChart;
