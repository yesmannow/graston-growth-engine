"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/directory?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/directory');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Find a Certified Graston Technique® Provider
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Search by location, specialty, or language to find the right expert for your needs.
        </p>
        <form
          onSubmit={handleSearch}
          className="mt-8 flex w-full max-w-lg mx-auto items-center space-x-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a city, state, or provider name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
};

export default Index;