"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchPath: string;
  setSearchPath: (value: string) => void;
  searchResult: { found: boolean; message: string } | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchPath, 
  setSearchPath,
  searchResult 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm sm:text-base font-medium text-foreground/80">
        Search by JSON Path
      </label>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          placeholder="e.g., $.user.name"
          className="pl-10 text-sm"
        />
      </div>

      <div className="min-h-[20px]">
        {searchResult && (
          <p 
            className={`text-xs sm:text-sm font-medium ${
              searchResult.found ? "text-green-600" : "text-red-500"
            }`}
          >
            {searchResult.message}
          </p>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p className="font-medium">Examples:</p>
        <ul className="list-disc list-inside space-y-0.5 mt-1">
          <li className="truncate">$.user.name</li>
          <li className="truncate">$.items[0].price</li>
        </ul>
      </div>
    </div>
  );
};