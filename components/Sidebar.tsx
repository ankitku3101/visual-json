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
}

export function Sidebar({ json, setJson, searchPath, setSearchPath, searchResult }: SidebarProps) {

  const handleClear = () => {
    setJson('');
    setSearchPath('');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <JsonInput json={json} setJson={setJson} />

      <SearchBar 
        searchPath={searchPath} 
        setSearchPath={setSearchPath}
        searchResult={searchResult}
      />

      <Button 
        onClick={handleClear}
        variant="secondary"
        className="w-full"
      >
        Clear All
      </Button>
        
      <Button>
        Export as Image
      </Button>
    </div>
  );
}