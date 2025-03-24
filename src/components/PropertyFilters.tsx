
import { useState } from "react";
import { 
  Filter, X, Check, ChevronDown, ChevronUp, 
  Home, DollarSign, Bath, Bed, Move, Coffee, Wifi, Car 
} from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  allowMultiple?: boolean;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Record<string, string | string[]>) => void;
  currentFilters: Record<string, string | string[]>;
  className?: string;
}

const PropertyFilters = ({ 
  onFilterChange, 
  currentFilters = {},
  className = ""
}: PropertyFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    propertyType: true,
    price: true
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Get count of active filters
  const getActiveFilterCount = () => {
    return Object.values(currentFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count + (value ? 1 : 0);
    }, 0);
  };

  // Handle updating filters
  const handleFilterChange = (
    sectionId: string, 
    value: string, 
    allowMultiple = false
  ) => {
    const currentValue = currentFilters[sectionId];
    
    if (allowMultiple) {
      const values = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = values.indexOf(value);
      
      if (index >= 0) {
        values.splice(index, 1);
      } else {
        values.push(value);
      }
      
      onFilterChange({ ...currentFilters, [sectionId]: values });
    } else {
      const newValue = currentValue === value ? "" : value;
      onFilterChange({ ...currentFilters, [sectionId]: newValue });
    }
  };

  // Handle clearing all filters
  const handleClearFilters = () => {
    onFilterChange({});
  };

  const filterSections: FilterSection[] = [
    {
      id: "propertyType",
      title: "Property Type",
      options: [
        { value: "house", label: "House", icon: <Home size={16} /> },
        { value: "apartment", label: "Apartment", icon: <Home size={16} /> },
        { value: "condo", label: "Condo", icon: <Home size={16} /> },
        { value: "townhouse", label: "Townhouse", icon: <Home size={16} /> }
      ],
      allowMultiple: true
    },
    {
      id: "price",
      title: "Price Range",
      options: [
        { value: "0-500000", label: "Under $500k", icon: <DollarSign size={16} /> },
        { value: "500000-1000000", label: "$500k - $1M", icon: <DollarSign size={16} /> },
        { value: "1000000-2000000", label: "$1M - $2M", icon: <DollarSign size={16} /> },
        { value: "2000000-999999999", label: "Over $2M", icon: <DollarSign size={16} /> }
      ]
    },
    {
      id: "beds",
      title: "Bedrooms",
      options: [
        { value: "1", label: "1+ bed", icon: <Bed size={16} /> },
        { value: "2", label: "2+ beds", icon: <Bed size={16} /> },
        { value: "3", label: "3+ beds", icon: <Bed size={16} /> },
        { value: "4", label: "4+ beds", icon: <Bed size={16} /> }
      ]
    },
    {
      id: "baths",
      title: "Bathrooms",
      options: [
        { value: "1", label: "1+ bath", icon: <Bath size={16} /> },
        { value: "2", label: "2+ baths", icon: <Bath size={16} /> },
        { value: "3", label: "3+ baths", icon: <Bath size={16} /> }
      ]
    },
    {
      id: "area",
      title: "Area (sq ft)",
      options: [
        { value: "0-1000", label: "< 1,000", icon: <Move size={16} /> },
        { value: "1000-2000", label: "1,000 - 2,000", icon: <Move size={16} /> },
        { value: "2000-3000", label: "2,000 - 3,000", icon: <Move size={16} /> },
        { value: "3000-999999", label: "3,000+", icon: <Move size={16} /> }
      ]
    },
    {
      id: "amenities",
      title: "Amenities",
      options: [
        { value: "pool", label: "Pool", icon: <Move size={16} /> },
        { value: "gym", label: "Gym", icon: <Move size={16} /> },
        { value: "parking", label: "Parking", icon: <Car size={16} /> },
        { value: "ac", label: "Air Conditioning", icon: <Move size={16} /> },
        { value: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
        { value: "pets", label: "Pet Friendly", icon: <Move size={16} /> },
        { value: "fireplace", label: "Fireplace", icon: <Move size={16} /> },
        { value: "balcony", label: "Balcony", icon: <Move size={16} /> },
        { value: "dishwasher", label: "Dishwasher", icon: <Move size={16} /> },
        { value: "furnished", label: "Furnished", icon: <Move size={16} /> },
        { value: "laundry", label: "Laundry", icon: <Move size={16} /> },
        { value: "garage", label: "Garage", icon: <Car size={16} /> }
      ],
      allowMultiple: true
    }
  ];

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`bg-card rounded-lg shadow-sm border ${className}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="primary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      </div>

      <div 
        className={`p-4 space-y-4 transition-all duration-300 ${
          isExpanded || window.innerWidth >= 1024 ? "block" : "hidden lg:block"
        }`}
      >
        {filterSections.map((section) => (
          <div key={section.id} className="pb-4 border-b last:border-b-0 last:pb-0">
            <button
              className="flex justify-between items-center w-full mb-3 text-left"
              onClick={() => toggleSection(section.id)}
            >
              <h4 className="font-medium">{section.title}</h4>
              {expandedSections[section.id] ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            
            {expandedSections[section.id] && (
              <div className="grid grid-cols-2 gap-2">
                {section.options.map((option) => {
                  const currentValue = currentFilters[section.id];
                  const isSelected = section.allowMultiple
                    ? Array.isArray(currentValue) && currentValue.includes(option.value)
                    : currentValue === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      className={`flex items-center p-2 rounded-md text-sm transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => handleFilterChange(section.id, option.value, section.allowMultiple)}
                    >
                      <div className="mr-2">
                        {isSelected ? (
                          <Check size={16} />
                        ) : (
                          option.icon || <span className="w-4 h-4 inline-block" />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex justify-end pt-2">
          <Button
            onClick={() => setIsExpanded(false)}
            className="lg:hidden"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
