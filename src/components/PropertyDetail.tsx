
import { useState } from "react";
import { 
  Bath, Bed, Calendar, Car, Check, ChevronDown, 
  ChevronUp, Heart, Home, MapPin, Move, Phone, Share2,
  BuildingIcon, RulerIcon, GlobeIcon
} from "lucide-react";
import { PropertyData } from "./PropertyCard";
import ImageGallery from "./ImageGallery";
import Badge from "./Badge";
import Button from "./Button";
import { Link } from "react-router-dom";

interface PropertyDetailProps {
  property: PropertyData;
  className?: string;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

// Component for showing property details like bedrooms, bathrooms, etc.
const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex flex-col items-center">
    <div className="rounded-full p-2 bg-secondary mb-2">
      {icon}
    </div>
    <div className="text-xl font-medium">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Main PropertyDetail component
const PropertyDetail = ({ property, className = "" }: PropertyDetailProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);
  
  // Use the property description if available, otherwise use a default
  const propertyDescription = property.description || 
    "This stunning property offers luxurious living in a prime location. The spacious interior features high ceilings, premium finishes, and large windows that flood the space with natural light. The open-concept layout is perfect for both entertaining and everyday living.";
  
  // Property images - use the property's image plus some samples
  const propertyImages = property.additionalImages ? 
    [property.imageUrl, ...property.additionalImages] : 
    [
      property.imageUrl,
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185009-5bf9f2849488?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558442074-cc152625c46d?q=80&w=2070&auto=format&fit=crop"
    ];
  
  // Property details - combine actual data with some sample data
  const propertyDetails = {
    yearBuilt: property.yearBuilt || 2020,
    lotSize: property.lotSize || "0.25 acres",
    parking: property.parking || "2-car garage",
    heating: property.heating || "Central",
    cooling: property.cooling || "Central Air",
    images: propertyImages,
    amenities: property.features || [
      "Swimming Pool",
      "Fitness Center",
      "Pet Friendly",
      "Outdoor Space",
      "Dishwasher",
      "Washer/Dryer",
      "Air Conditioning",
      "Smart Home Features",
      "Fireplace",
      "Walk-in Closets",
      "High Ceilings",
      "Hardwood Floors"
    ]
  };
  
  // Toggle description length
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  
  // Handle favorite button click
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Additional information from the property
  const mlsNumber = property.mlsNumber || "N/A";
  const agent = property.agent || null;
  
  return (
    <div className={`bg-card rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Image Gallery */}
      <ImageGallery images={propertyDetails.images} />
      
      <div className="p-6">
        {/* Property Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{property.title}</h1>
            <div className="flex items-center text-lg text-muted-foreground mb-2">
              <MapPin size={18} className="mr-2" />
              <span>{property.address}</span>
            </div>
            <div className="flex gap-2 mb-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {feature}
                </Badge>
              ))}
            </div>
            {mlsNumber !== "N/A" && (
              <div className="text-sm text-muted-foreground">
                MLS#: {mlsNumber}
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 text-3xl font-semibold text-primary">
            {formattedPrice}
          </div>
        </div>
        
        {/* Property Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-4 border-y">
          <DetailItem 
            icon={<Bed size={24} />} 
            label="Bedrooms" 
            value={property.bedrooms} 
          />
          <DetailItem 
            icon={<Bath size={24} />} 
            label="Bathrooms" 
            value={property.bathrooms} 
          />
          <DetailItem 
            icon={<Move size={24} />} 
            label="Sq Ft" 
            value={property.area.toLocaleString()} 
          />
          <DetailItem 
            icon={<Home size={24} />} 
            label="Year Built" 
            value={propertyDetails.yearBuilt} 
          />
        </div>
        
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">About This Property</h2>
          <div className="relative">
            <p className={`text-muted-foreground leading-relaxed ${
              !showDescription && "line-clamp-4"
            }`}>
              {propertyDescription}
            </p>
            <button 
              className="mt-2 text-primary font-medium inline-flex items-center"
              onClick={toggleDescription}
            >
              {showDescription ? (
                <>Read Less <ChevronUp size={16} className="ml-1" /></>
              ) : (
                <>Read More <ChevronDown size={16} className="ml-1" /></>
              )}
            </button>
          </div>
        </div>
        
        {/* Additional Property Info */}
        {(property.lotSize || property.propertyType || property.ownershipType) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Property Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.lotSize && (
                <div className="flex items-center">
                  <RulerIcon size={20} className="mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Lot Size</div>
                    <div>{property.lotSize}</div>
                  </div>
                </div>
              )}
              {property.propertyType && (
                <div className="flex items-center">
                  <BuildingIcon size={20} className="mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Property Type</div>
                    <div>{property.propertyType}</div>
                  </div>
                </div>
              )}
              {property.ownershipType && (
                <div className="flex items-center">
                  <GlobeIcon size={20} className="mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Ownership</div>
                    <div>{property.ownershipType}</div>
                  </div>
                </div>
              )}
              {mlsNumber !== "N/A" && (
                <div className="flex items-center">
                  <GlobeIcon size={20} className="mr-3 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">MLS Number</div>
                    <div>{mlsNumber}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Agent Information */}
        {agent && (
          <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Listing Agent</h2>
            <div className="flex items-center gap-4">
              {agent.photo && (
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={agent.photo} 
                    alt={agent.name || "Agent"} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-medium">{agent.name}</h3>
                {agent.position && <p className="text-sm">{agent.position}</p>}
                {agent.organization && <p className="text-sm text-muted-foreground">{agent.organization}</p>}
                {agent.phone && (
                  <a 
                    href={`tel:${agent.phone}`}
                    className="text-sm text-primary flex items-center mt-1"
                  >
                    <Phone size={14} className="mr-1" />
                    {agent.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Property Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
            {propertyDetails.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <Check size={16} className="mr-2 text-primary" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact and Actions */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Button 
            className="w-full"
            size="lg"
            icon={<Phone size={18} />}
          >
            Contact Agent
          </Button>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              className="flex-1"
              icon={<Calendar size={18} />}
            >
              Schedule Tour
            </Button>
            <Button 
              variant="outline"
              className="p-3"
              onClick={handleFavoriteClick}
              icon={<Heart size={18} fill={isFavorite ? "currentColor" : "transparent"} />}
            />
            <Button 
              variant="outline"
              className="p-3"
              icon={<Share2 size={18} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
