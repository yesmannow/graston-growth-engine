import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="flex w-full max-w-xl">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="rounded-l-md"
        onKeyDown={handleKeyDown}
      />
      <Button onClick={() => onSearch(value)} className="rounded-r-md">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;
