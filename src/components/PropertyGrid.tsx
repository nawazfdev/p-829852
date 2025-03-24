
import PropertyCard, { PropertyData } from "./PropertyCard";

interface PropertyGridProps {
  properties: PropertyData[];
  layout?: "grid" | "list";
}

const PropertyGrid = ({ properties, layout = "grid" }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No properties found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  if (layout === "list") {
    return (
      <div className="space-y-4">
        {properties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            layout="list" 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard 
          key={property.id} 
          property={property} 
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
