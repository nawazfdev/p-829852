
import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { PropertyData } from "./PropertyCard";

interface MapViewProps {
  properties: PropertyData[];
  onSelectProperty?: (id: number) => void;
  selectedPropertyId?: number;
}

// Simulating a map implementation without a real map SDK
const MapView = ({ 
  properties, 
  onSelectProperty, 
  selectedPropertyId 
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  
  // When a real map is integrated, markers would be computed based on actual coordinates
  // This simulation just places markers in a grid for visual representation
  const calculateMarkerPosition = (index: number) => {
    const gridSize = Math.ceil(Math.sqrt(properties.length));
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    // Add some randomness to positions for a more realistic appearance
    const randomOffsetX = Math.random() * 5 - 2.5;
    const randomOffsetY = Math.random() * 5 - 2.5;
    
    return {
      left: `${(col * (100 / gridSize)) + randomOffsetX + 5}%`,
      top: `${(row * (100 / gridSize)) + randomOffsetY + 5}%`,
    };
  };

  // Handle marker click
  const handleMarkerClick = (id: number) => {
    setActiveMarker(id);
    if (onSelectProperty) {
      onSelectProperty(id);
    }
  };

  // Update active marker when selected property changes
  useEffect(() => {
    if (selectedPropertyId !== undefined) {
      setActiveMarker(selectedPropertyId);
    }
  }, [selectedPropertyId]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height: "calc(100vh - 150px)" }}>
      {/* Map Placeholder */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 bg-secondary/50"
        style={{
          backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-73.9808,40.7648,11/1200x800?access_token=pk.eyJ1Ijoic2FtcGxlLXVzZXIiLCJhIjoiY2xoOWVmNzV4MGVjcTNybzc5NGkzeTJnaiJ9.0XKQtb2gGmODNQQ1XhTiJA")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Simulated Property Markers */}
        {properties.map((property, index) => {
          const position = calculateMarkerPosition(index);
          const isActive = activeMarker === property.id;
          
          return (
            <div 
              key={property.id}
              className="absolute cursor-pointer transition-all duration-300"
              style={position}
            >
              <div
                className={`${
                  isActive 
                    ? "scale-125 bg-primary" 
                    : "bg-primary/80 hover:scale-110"
                } transform transition-all duration-300 p-1 rounded-full shadow-lg`}
                onClick={() => handleMarkerClick(property.id)}
              >
                <MapPin 
                  size={isActive ? 20 : 18} 
                  color="white" 
                  fill="white" 
                  className="transition-all"
                />
              </div>
              
              {/* Price Tag */}
              {isActive && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass px-2 py-1 rounded-lg text-sm font-medium z-10 whitespace-nowrap animate-fade-in">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(property.price)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Map Usage Notice */}
      <div className="absolute bottom-4 left-4 z-10 glass px-3 py-2 rounded-lg text-xs text-muted-foreground">
        This is a simulated map view. Will be connected to a real map service later.
      </div>
    </div>
  );
};

export default MapView;
