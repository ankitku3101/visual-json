// 'use client'
import { Button } from "@/components/ui/button";
import { JsonInput } from "./JsonInput";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";

interface SidebarProps {
  json: string;
  setJson: (value: string) => void;
  searchPath: string;
  setSearchPath: (value: string) => void;
  searchResult: { found: boolean; message: string } | null;
  onExportImage: () => void;
}

export function Sidebar({ json, setJson, searchPath, setSearchPath, searchResult, onExportImage }: SidebarProps) {

  const handleClear = () => {
    setJson('');
    setSearchPath('');
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 h-full overflow-y-auto">
      <JsonInput json={json} setJson={setJson} />

      <SearchBar 
        searchPath={searchPath} 
        setSearchPath={setSearchPath}
        searchResult={searchResult}
      />

      <div className="flex flex-col gap-2 mt-auto flex-shrink-0">
        <Button 
          onClick={handleClear}
          variant="secondary"
          className="w-full text-sm"
        >
          Clear All
        </Button>
          
        <Button 
          onClick={onExportImage}
          className="w-full text-sm"
        >
          Export as Image
        </Button>
      </div>
    </div>
  );
}