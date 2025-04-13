
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, LayoutList, MapIcon, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyFilters from "@/components/PropertyFilters";
import SearchBar from "@/components/SearchBar";
import MapView from "@/components/MapView";
import Button from "@/components/Button";
import { PropertyData } from "@/components/PropertyCard";
import { useToast } from "@/hooks/use-toast";
import { fetchPropertiesFromApify, PropertySearchParams } from "@/services/apify-service";

const Properties = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);
  const [isMapView, setIsMapView] = useState(searchParams.get("view") === "map");
  const [gridLayout, setGridLayout] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load properties data from Apify
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      
      try {
        // Get search parameters
        const searchQuery = searchParams.get("search");
        const cityParam = searchParams.get("city");
        
        // Set up search parameters for Apify
        const searchConfig: PropertySearchParams = {
          city: cityParam || undefined,
          maxItems: 50 // Limit to 50 items for better performance
        };
        
        // If there's a search query, add it to the search config
        if (searchQuery) {
          // In a real implementation, we'd parse this into specific search parameters
          // For now, we'll just use it as a city parameter if no city is specified
          if (!searchConfig.city) {
            searchConfig.city = searchQuery;
          }
        }
        
        // Fetch properties from Apify
        const apifyProperties = await fetchPropertiesFromApify(searchConfig);
        
        if (apifyProperties && apifyProperties.length > 0) {
          // Add featured and new flags to some properties
          const enhancedProperties = apifyProperties.map((p, i) => ({
            ...p,
            isFeatured: i < 3,
            isNew: i >= 3 && i < 6
          }));
          
          setProperties(enhancedProperties);
          toast({
            title: "Properties Loaded",
            description: `Successfully loaded ${enhancedProperties.length} properties from Realtor.ca.`,
          });
        } else {
          // Fallback to static data if no properties found
          const staticProperties: PropertyData[] = [
            {
              id: 1,
              title: "Modern Luxury Villa",
              address: "123 Palm Avenue, Waterloo, ON N2L 3G1",
              price: 4250000,
              bedrooms: 5,
              bathrooms: 4.5,
              area: 4200,
              features: ["Pool", "Smart Home", "View"],
              imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
              isFeatured: true
            },
            {
              id: 2,
              title: "Downtown Penthouse",
              address: "1000 University Avenue, Waterloo, ON N2L 3G5",
              price: 3750000,
              bedrooms: 3,
              bathrooms: 3,
              area: 3000,
              features: ["Doorman", "Terrace", "Gym"],
              imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
              isFeatured: true
            },
            {
              id: 3,
              title: "Waterfront Contemporary",
              address: "500 Beach Drive, Waterloo, ON N2L 3G8",
              price: 5950000,
              bedrooms: 4,
              bathrooms: 4,
              area: 4800,
              features: ["Waterfront", "Pool", "Smart Home"],
              imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
              isFeatured: true
            },
            {
              id: 4,
              title: "Modern Farmhouse",
              address: "42 Meadow Lane, Kitchener, ON N2E 1A1",
              price: 2850000,
              bedrooms: 4,
              bathrooms: 3.5,
              area: 3800,
              features: ["New Construction", "Smart Home", "Energy Efficient"],
              imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
              isNew: true
            },
            {
              id: 5,
              title: "Hillside Retreat",
              address: "789 Canyon Road, Waterloo, ON N2L 5Y7",
              price: 3250000,
              bedrooms: 3,
              bathrooms: 3.5,
              area: 3200,
              features: ["Views", "Pool", "Home Office"],
              imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
              isNew: true
            },
            {
              id: 6,
              title: "Urban Loft",
              address: "550 Market Street, Waterloo, ON N2J 4K3",
              price: 1750000,
              bedrooms: 2,
              bathrooms: 2,
              area: 1800,
              features: ["Industrial", "High Ceilings", "City Views"],
              imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
              isNew: true
            },
            {
              id: 7,
              title: "Historic Brownstone",
              address: "225 Beacon Street, Boston, MA 02116",
              price: 4100000,
              bedrooms: 4,
              bathrooms: 3.5,
              area: 4000,
              features: ["Historic", "Fireplace", "Garden"],
              imageUrl: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2081&auto=format&fit=crop"
            },
            {
              id: 8,
              title: "Beachfront Cottage",
              address: "301 Ocean Drive, Santa Monica, CA 90402",
              price: 3600000,
              bedrooms: 3,
              bathrooms: 2,
              area: 2200,
              features: ["Beach Access", "Ocean View", "Renovated"],
              imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
            },
            {
              id: 9,
              title: "Mountain Retreat",
              address: "42 Pine Lane, Aspen, CO 81611",
              price: 6200000,
              bedrooms: 5,
              bathrooms: 5.5,
              area: 5800,
              features: ["Mountain View", "Ski-in/Ski-out", "Hot Tub"],
              imageUrl: "https://images.unsplash.com/photo-1609760322879-3f37641966f6?q=80&w=2071&auto=format&fit=crop"
            }
          ];
          
          setProperties(staticProperties);
          
          toast({
            title: "Using Sample Data",
            description: "No properties found from API. Showing sample properties instead.",
            variant: "default"
          });
        }
      } catch (error) {
        console.error("Error loading properties:", error);
        toast({
          title: "Error Loading Properties",
          description: "Failed to load properties from API. Showing static data instead.",
          variant: "destructive"
        });
        
        // Fallback to static data on error
        const staticProperties: PropertyData[] = [
          {
            id: 1,
            title: "Modern Luxury Villa",
            address: "123 Palm Avenue, Waterloo, ON N2L 3G1",
            price: 4250000,
            bedrooms: 5,
            bathrooms: 4.5,
            area: 4200,
            features: ["Pool", "Smart Home", "View"],
            imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            isFeatured: true
          },
          {
            id: 2,
            title: "Downtown Penthouse",
            address: "1000 University Avenue, Waterloo, ON N2L 3G5",
            price: 3750000,
            bedrooms: 3,
            bathrooms: 3,
            area: 3000,
            features: ["Doorman", "Terrace", "Gym"],
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            isFeatured: true
          },
          {
            id: 3,
            title: "Waterfront Contemporary",
            address: "500 Beach Drive, Waterloo, ON N2L 3G8",
            price: 5950000,
            bedrooms: 4,
            bathrooms: 4,
            area: 4800,
            features: ["Waterfront", "Pool", "Smart Home"],
            imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
            isFeatured: true
          },
          {
            id: 4,
            title: "Modern Farmhouse",
            address: "42 Meadow Lane, Kitchener, ON N2E 1A1",
            price: 2850000,
            bedrooms: 4,
            bathrooms: 3.5,
            area: 3800,
            features: ["New Construction", "Smart Home", "Energy Efficient"],
            imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
            isNew: true
          },
          {
            id: 5,
            title: "Hillside Retreat",
            address: "789 Canyon Road, Waterloo, ON N2L 5Y7",
            price: 3250000,
            bedrooms: 3,
            bathrooms: 3.5,
            area: 3200,
            features: ["Views", "Pool", "Home Office"],
            imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
            isNew: true
          },
          {
            id: 6,
            title: "Urban Loft",
            address: "550 Market Street, Waterloo, ON N2J 4K3",
            price: 1750000,
            bedrooms: 2,
            bathrooms: 2,
            area: 1800,
            features: ["Industrial", "High Ceilings", "City Views"],
            imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
            isNew: true
          },
          {
            id: 7,
            title: "Historic Brownstone",
            address: "225 Beacon Street, Boston, MA 02116",
            price: 4100000,
            bedrooms: 4,
            bathrooms: 3.5,
            area: 4000,
            features: ["Historic", "Fireplace", "Garden"],
            imageUrl: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2081&auto=format&fit=crop"
          },
          {
            id: 8,
            title: "Beachfront Cottage",
            address: "301 Ocean Drive, Santa Monica, CA 90402",
            price: 3600000,
            bedrooms: 3,
            bathrooms: 2,
            area: 2200,
            features: ["Beach Access", "Ocean View", "Renovated"],
            imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
          },
          {
            id: 9,
            title: "Mountain Retreat",
            address: "42 Pine Lane, Aspen, CO 81611",
            price: 6200000,
            bedrooms: 5,
            bathrooms: 5.5,
            area: 5800,
            features: ["Mountain View", "Ski-in/Ski-out", "Hot Tub"],
            imageUrl: "https://images.unsplash.com/photo-1609760322879-3f37641966f6?q=80&w=2071&auto=format&fit=crop"
          }
        ];
        
        setProperties(staticProperties);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProperties();
  }, [toast, searchParams]);

  // Filter properties when activeFilters change
  useEffect(() => {
    let result = [...properties];
    
    // Handle featured filter
    if (activeFilters.featured === "true") {
      result = result.filter(p => p.isFeatured);
    }
    
    // Handle new properties filter
    if (activeFilters.new === "true") {
      result = result.filter(p => p.isNew);
    }
    
    // Handle property type filter
    if (activeFilters.propertyType && Array.isArray(activeFilters.propertyType) && activeFilters.propertyType.length > 0) {
      result = result.filter(p => 
        p.features && p.features.some(feature => 
          activeFilters.propertyType && Array.isArray(activeFilters.propertyType) &&
          activeFilters.propertyType.some(type => 
            feature.toLowerCase().includes(type.toLowerCase())
          )
        )
      );
    }
    
    // Handle price range filter
    if (activeFilters.price) {
      const priceRange = activeFilters.price as string;
      const [minStr, maxStr] = priceRange.split('-');
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      
      result = result.filter(p => p.price >= min && p.price <= max);
    }
    
    // Handle bedrooms filter
    if (activeFilters.beds) {
      const minBeds = parseInt(activeFilters.beds as string);
      result = result.filter(p => p.bedrooms >= minBeds);
    }
    
    // Handle bathrooms filter
    if (activeFilters.baths) {
      const minBaths = parseInt(activeFilters.baths as string);
      result = result.filter(p => p.bathrooms >= minBaths);
    }
    
    // Handle area filter
    if (activeFilters.area) {
      const areaRange = activeFilters.area as string;
      const [minStr, maxStr] = areaRange.split('-');
      const min = parseInt(minStr);
      const max = parseInt(maxStr);
      
      result = result.filter(p => p.area >= min && p.area <= max);
    }
    
    // Handle amenities filter
    if (activeFilters.amenities && Array.isArray(activeFilters.amenities) && activeFilters.amenities.length > 0) {
      result = result.filter(p => 
        activeFilters.amenities && Array.isArray(activeFilters.amenities) && 
        activeFilters.amenities.some(amenity => 
          p.features.some(feature => 
            feature.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }
    
    // Handle search query (from SearchBar)
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.address.toLowerCase().includes(query)
      );
    }
    
    setFilteredProperties(result);
  }, [properties, activeFilters, searchParams]);

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, string | string[]>) => {
    setActiveFilters(filters);
  };

  // Toggle between map and grid view
  const toggleView = (view: "grid" | "map") => {
    setIsMapView(view === "map");
    
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    if (view === "map") {
      newParams.set("view", "map");
    } else {
      newParams.delete("view");
    }
    setSearchParams(newParams);
  };

  // Handle property selection in map view
  const handlePropertySelect = (id: number) => {
    setSelectedPropertyId(id);
    const property = properties.find(p => p.id === id);
    if (property) {
      // You could scroll to the property in the list
      // or show a popup with property details
      console.log("Selected property:", property.title);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Page header with search and view toggles */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Waterloo Properties</h1>
            <p className="text-muted-foreground">
              {isLoading ? "Loading properties..." : `${filteredProperties.length} properties available`}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-4">
            <SearchBar 
              variant="compact" 
              className="w-full md:w-auto md:min-w-[300px]" 
            />
            
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg p-1">
              <Button
                variant={!isMapView ? "primary" : "ghost"}
                size="sm"
                className="py-1 px-3"
                icon={<LayoutGrid size={16} />}
                onClick={() => toggleView("grid")}
              >
                Grid
              </Button>
              <Button
                variant={isMapView ? "primary" : "ghost"}
                size="sm"
                className="py-1 px-3"
                icon={<MapIcon size={16} />}
                onClick={() => toggleView("map")}
              >
                Map
              </Button>
            </div>
            
            {!isMapView && (
              <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg p-1">
                <button
                  className={`p-2 rounded-md ${
                    gridLayout === "grid" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setGridLayout("grid")}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  className={`p-2 rounded-md ${
                    gridLayout === "list" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setGridLayout("list")}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile view toggles */}
        <div className="flex md:hidden items-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1 flex-1">
            <Button
              variant={!isMapView ? "primary" : "ghost"}
              size="sm"
              className="flex-1 py-1"
              icon={<LayoutGrid size={16} />}
              onClick={() => toggleView("grid")}
            >
              Grid
            </Button>
            <Button
              variant={isMapView ? "primary" : "ghost"}
              size="sm"
              className="flex-1 py-1"
              icon={<MapIcon size={16} />}
              onClick={() => toggleView("map")}
            >
              Map
            </Button>
          </div>
          
          {!isMapView && (
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <button
                className={`p-2 rounded-md ${
                  gridLayout === "grid" ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setGridLayout("grid")}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`p-2 rounded-md ${
                  gridLayout === "list" ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setGridLayout("list")}
              >
                <LayoutList size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <PropertyFilters 
              onFilterChange={handleFilterChange}
              currentFilters={activeFilters}
            />
          </div>
          
          {/* Property List or Map */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center min-h-[400px] gap-3">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading properties from Realtor.ca...</p>
              </div>
            ) : isMapView ? (
              <div className="bg-card rounded-lg shadow-sm animate-fade-in">
                <MapView 
                  properties={filteredProperties}
                  onSelectProperty={handlePropertySelect}
                  selectedPropertyId={selectedPropertyId}
                />
              </div>
            ) : (
              <div className="animate-fade-in">
                <PropertyGrid 
                  properties={filteredProperties}
                  layout={gridLayout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
