"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Input } from "./ui/input";

interface JsonInputProps {
  json: string;
  setJson: (value: string) => void;
}

export const JsonInput: React.FC<JsonInputProps> = ({ json, setJson }) => {
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState(json);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleVisualize = () => {
    try {
      if (!inputValue.trim()) {
        setError("Please enter JSON data");
        return;
      }
      JSON.parse(inputValue);
      setJson(inputValue);
      setError("");
    } catch (err) {
      setError("Invalid JSON format! Please check your syntax.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          JSON.parse(text);
          setInputValue(text);
          setJson(text);
          setError("");
        } catch (err) {
          setError("Invalid JSON file!");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-lg font-medium text-foreground/80">Enter your JSON Data</label>
      <Textarea
        value={inputValue}
        onChange={handleChange}
        placeholder='{"name": "John", "age": 30}'
        className={clsx(
          "h-55 font-mono text-sm p-2 rounded-md border bg-card text-card-foreground",
          error ? "border-red-500" : "border-border",
          "focus:outline-none focus:ring-2 focus:ring-primary"
        )}
        rows={8}
      />
      
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      <Button 
        onClick={handleVisualize}
        className="w-full"
      >
        Visualize Tree
      </Button>

      <div className="relative">
        <Input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="mt-2 cursor-pointer"
        />
      </div>
    </div>
  );
};