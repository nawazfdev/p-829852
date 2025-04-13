import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Home, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyDetail from "@/components/PropertyDetail";
import Button from "@/components/Button";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { fetchPropertiesFromApify } from "@/services/apify-service";
import { useToast } from "@/hooks/use-toast";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [similarProperties, setSimilarProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      
      try {
        const allProperties = await fetchPropertiesFromApify();
        const propertyId = parseInt(id || "0");
        
        if (allProperties && allProperties.length > 0) {
          const foundProperty = allProperties.find(p => p.id === propertyId);
          
          if (foundProperty) {
            setProperty(foundProperty);
            
            const similar = allProperties
              .filter(p => 
                p.id !== propertyId && 
                Math.abs(p.price - foundProperty.price) < 1000000 &&
                Math.abs(p.bedrooms - foundProperty.bedrooms) <= 1
              )
              .slice(0, 3);
            
            setSimilarProperties(similar);
          } else {
            useStaticFallback();
          }
        } else {
          useStaticFallback();
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
        toast({
          title: "Error",
          description: "Failed to load property details. Showing sample data instead.",
          variant: "destructive"
        });
        
        useStaticFallback();
      } finally {
        setLoading(false);
      }
    };
    
    const useStaticFallback = () => {
      const allProperties: PropertyData[] = [
        {
          id: 1,
          title: "Modern Luxury Villa",
          address: "123 Palm Avenue, Beverly Hills, CA 90210",
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
          address: "1000 Fifth Avenue, New York, NY 10028",
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
          address: "500 Beach Drive, Miami Beach, FL 33139",
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
          address: "42 Meadow Lane, Greenwich, CT 06830",
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
          address: "789 Canyon Road, Los Angeles, CA 90077",
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
          address: "550 Market Street, San Francisco, CA 94104",
          price: 1750000,
          bedrooms: 2,
          bathrooms: 2,
          area: 1800,
          features: ["Industrial", "High Ceilings", "City Views"],
          imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
          isNew: true
        }
      ];
      
      const foundProperty = allProperties.find(p => p.id === parseInt(id || "0"));
      
      if (foundProperty) {
        setProperty(foundProperty);
        
        const similar = allProperties
          .filter(p => 
            p.id !== foundProperty.id && 
            Math.abs(p.price - foundProperty.price) < 1000000 &&
            Math.abs(p.bedrooms - foundProperty.bedrooms) <= 1
          )
          .slice(0, 3);
        
        setSimilarProperties(similar);
      }
    };
    
    if (id) {
      fetchProperty();
    }
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
          <Home size={48} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/properties">
            <Button>Browse All Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Link to="/properties" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} className="mr-2" /> Back to Properties
          </Link>
        </div>
        
        <PropertyDetail property={property} />
        
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
