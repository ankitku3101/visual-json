'use client'

import { Sidebar } from '@/components/Sidebar'
import CanvasArea from '@/components/CanvasArea'
import { useState, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {

  const sampleJson = {
    user: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
      }
    },
    items: [
      { id: 1, name: "Laptop", price: 999 },
      { id: 2, name: "Mouse", price: 25 }
    ],
    active: true
  };
  
  const [json, setJson] = useState(JSON.stringify(sampleJson, null, 2));
  const [searchPath, setSearchPath] = useState('');
  const [searchResult, setSearchResult] = useState<{ found: boolean; message: string } | null>(null);
  
  // Reference to trigger export from CanvasArea
  const exportImageRef = useRef<(() => void) | null>(null);

  const handleExportImage = () => {
    if (exportImageRef.current) {
      exportImageRef.current();
    }
  };

  return (
    <main className="flex h-screen gap-4 p-4">
      {/* Left Sidebar */}
      <div className="w-[400px] border rounded-lg p-4 shadow-xl shadow-shadow">
        <Sidebar 
          json={json} 
          setJson={setJson}
          searchPath={searchPath}
          setSearchPath={setSearchPath}
          searchResult={searchResult}
          onExportImage={handleExportImage}
        />
      </div>
      <div className='flex-1 flex flex-col gap-3'>
        <div className="w-full relative">
          <h2 className="text-4xl font-semibold text-primary text-center">JSON Tree Visualizer</h2>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <ThemeToggle />
          </div>
        </div>
        {/* Right Canvas Area */}
        <div className="flex-1 h-full bg-background rounded-lg shadow-xl shadow-shadow">
          <CanvasArea 
            json={json} 
            searchPath={searchPath}
            setSearchResult={setSearchResult}
            exportImageRef={exportImageRef}
          />
        </div>
      </div>
    </main>
  )
}