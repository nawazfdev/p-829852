
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bath, Bed, MapPin, Move, Star } from "lucide-react";
import Badge from "./Badge";
import { cn } from "@/lib/utils";

export interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  imageUrl: string;
  isFeatured?: boolean;
  isNew?: boolean;
  mlsNumber?: string;
  description?: string;
}

interface PropertyCardProps {
  property: PropertyData;
  layout?: "grid" | "list";
  className?: string;
}

const PropertyCard = ({ 
  property, 
  layout = "grid", 
  className = ""
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const {
    id,
    title,
    address,
    price,
    bedrooms,
    bathrooms,
    area,
    features,
    imageUrl,
    isFeatured,
    isNew
  } = property;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (layout === "list") {
    return (
      <Link
        to={`/property/${id}`}
        className={cn(
          "group block property-card hover-scale rounded-xl overflow-hidden bg-card",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? "bg-destructive/90 text-white" 
                    : "bg-black/30 text-white hover:bg-black/50"
                }`}
              >
                <Heart size={18} fill={isFavorite ? "white" : "transparent"} />
              </button>
            </div>
            {isNew && (
              <Badge
                variant="feature"
                className="absolute top-2 left-2 bg-primary text-white"
              >
                NEW
              </Badge>
            )}
            {isFeatured && (
              <Badge
                variant="feature"
                className="absolute top-2 left-2 bg-amber-500 text-white"
              >
                <Star size={12} className="mr-1" /> FEATURED
              </Badge>
            )}
          </div>
          
          <div className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span className="line-clamp-1">{address}</span>
                </div>
              </div>
              <p className="text-lg font-semibold text-primary">{formattedPrice}</p>
            </div>
            
            <div className="mt-4 flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{bedrooms} bd</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{bathrooms} ba</span>
              </div>
              <div className="flex items-center">
                <Move size={16} className="mr-1" />
                <span>{area} sqft</span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/property/${id}`}
      className={cn(
        "group block property-card hover-scale rounded-xl overflow-hidden bg-card",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? "bg-destructive/90 text-white" 
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <Heart size={18} fill={isFavorite ? "white" : "transparent"} />
          </button>
        </div>
        {isNew && (
          <Badge
            variant="feature"
            className="absolute top-2 left-2 bg-primary text-white"
          >
            NEW
          </Badge>
        )}
        {isFeatured && (
          <Badge
            variant="feature"
            className="absolute top-2 left-2 bg-amber-500 text-white"
          >
            <Star size={12} className="mr-1" /> FEATURED
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
          <p className="text-lg font-semibold text-primary">{formattedPrice}</p>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{address}</span>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-muted-foreground">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{bedrooms} bd</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{bathrooms} ba</span>
          </div>
          <div className="flex items-center">
            <Move size={16} className="mr-1" />
            <span>{area} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
