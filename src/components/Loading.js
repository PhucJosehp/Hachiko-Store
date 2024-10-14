import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center gap-2 text-3xl h-96 w-full mt-[1000px]">
      Loading
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}
