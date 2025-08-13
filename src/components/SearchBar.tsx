import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  showLocationSuggestions?: boolean;
}

interface LocationSuggestion {
  description: string;
  place_id: string;
  types: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder,
  showLocationSuggestions = false 
}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedValue = useDebounce(value, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Get location suggestions using Google Places API
  useEffect(() => {
    if (showLocationSuggestions && debouncedValue && debouncedValue.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: debouncedValue,
          types: ['(cities)'],
          componentRestrictions: { country: 'us' }
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions.slice(0, 5));
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue, showLocationSuggestions]);

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      // Add to recent searches
      const updated = [searchValue, ...recentSearches.filter(s => s !== searchValue)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      onSearch(searchValue);
      setShowSuggestions(false);
      setValue(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalSuggestions = suggestions.length + recentSearches.length;
    
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < totalSuggestions) {
        const selectedItem = activeIndex < suggestions.length 
          ? suggestions[activeIndex].description
          : recentSearches[activeIndex - suggestions.length];
        handleSearch(selectedItem);
      } else {
        handleSearch(value);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, totalSuggestions - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className="relative flex w-full max-w-xl">
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || 'Search by name, specialty, or location...'}
          className="rounded-l-md pr-10"
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {/* Suggestions dropdown */}
        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {/* Recent searches */}
            {recentSearches.length > 0 && !value && (
              <>
                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50">
                  Recent Searches
                </div>
                {recentSearches.map((search, idx) => (
                  <div
                    key={`recent-${idx}`}
                    className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                      idx === activeIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSearch(search)}
                  >
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{search}</span>
                  </div>
                ))}
              </>
            )}
            
            {/* Location suggestions */}
            {suggestions.length > 0 && (
              <>
                {recentSearches.length > 0 && !value && (
                  <div className="border-t border-gray-100" />
                )}
                <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50">
                  Location Suggestions
                </div>
                {suggestions.map((suggestion, idx) => {
                  const adjustedIndex = recentSearches.length + idx;
                  return (
                    <div
                      key={suggestion.place_id}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 ${
                        adjustedIndex === activeIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSearch(suggestion.description)}
                    >
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{suggestion.description}</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
      
      <Button 
        onClick={() => handleSearch(value)} 
        className="rounded-l-none"
        type="button"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SearchBar;