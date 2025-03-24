
import { useState } from "react";
import { Search, MapPin, Building, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

const SearchBar = ({ variant = "hero", className = "" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const suggestions = [
    { type: "location", text: "New York, NY" },
    { type: "location", text: "San Francisco, CA" },
    { type: "location", text: "Miami, FL" },
    { type: "type", text: "Modern Apartments" },
    { type: "type", text: "Luxury Villas" },
    { type: "type", text: "Waterfront Properties" },
  ];

  // Filter suggestions based on search term
  const filteredSuggestions = searchTerm 
    ? suggestions.filter(s => 
        s.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : suggestions;

  return (
    <div className={`relative ${className}`}>
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center ${
          variant === "hero"
            ? "glass rounded-full transition-all duration-300 transform"
            : "bg-background border border-border rounded-lg"
        }`}
      >
        <div className="absolute left-4 text-muted-foreground">
          <Search size={variant === "hero" ? 20 : 16} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value) setIsExpanded(true);
          }}
          onFocus={() => setIsExpanded(true)}
          className={`w-full bg-transparent border-none focus:outline-none focus:ring-0 ${
            variant === "hero"
              ? "py-4 pl-12 pr-4 text-lg"
              : "py-2 pl-10 pr-3 text-sm"
          }`}
          placeholder="Search by address, city, or zip code..."
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setIsExpanded(false);
            }}
            className="absolute right-4 text-muted-foreground hover:text-foreground"
          >
            <X size={variant === "hero" ? 18 : 14} />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {isExpanded && filteredSuggestions.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-10 shadow-lg animate-fade-in"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking suggestions
        >
          <div className="p-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex items-center w-full p-3 hover:bg-secondary rounded-lg text-left transition-colors"
                onClick={() => {
                  setSearchTerm(suggestion.text);
                  setIsExpanded(false);
                }}
              >
                {suggestion.type === "location" ? (
                  <MapPin size={16} className="mr-3 text-muted-foreground" />
                ) : (
                  <Building size={16} className="mr-3 text-muted-foreground" />
                )}
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
