
import { PropertyData } from "@/components/PropertyCard";

interface RepliersProperty {
  mlsNumber: string;
  listPrice: number;
  unparsedAddress: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  type: 'Sale' | 'Lease';
  images: string[];
  details?: {
    description: string;
  };
}

interface RepliersResponse {
  listings: RepliersProperty[];
  meta?: {
    total: number;
  };
}

export const fetchProperties = async (filters: Record<string, any> = {}): Promise<PropertyData[]> => {
  try {
    // Check if we have API settings in localStorage
    const settingsJson = localStorage.getItem('mlsApiSettings');
    if (!settingsJson) {
      console.warn('No MLS API settings found');
      return [];
    }
    
    const settings = JSON.parse(settingsJson);
    const apiKey = settings.apiKey;
    const apiUrl = settings.apiUrl;
    
    if (!apiKey) {
      console.warn('No API key found in settings');
      return [];
    }
    
    // Build request payload from filters
    const requestPayload: Record<string, any> = {
      mlsNumber: "*",
      operator: "AND",
      sortBy: filters.sortBy || "updatedOnDesc",
      status: "A"
    };
    
    // Add filters if provided
    if (filters.location) {
      requestPayload.searchLocation = filters.location;
    }
    
    if (filters.propertyType) {
      requestPayload.propertyType = filters.propertyType;
    }
    
    if (filters.minBedrooms) {
      requestPayload.minBedrooms = parseInt(filters.minBedrooms);
    }
    
    if (filters.minBathrooms) {
      requestPayload.minBathrooms = parseInt(filters.minBathrooms);
    }
    
    if (filters.minPrice) {
      requestPayload.minPrice = parseInt(filters.minPrice);
    }
    
    if (filters.maxPrice) {
      requestPayload.maxPrice = parseInt(filters.maxPrice);
    }
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'REPLIERS-API-KEY': apiKey
      },
      body: JSON.stringify(requestPayload)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: RepliersResponse = await response.json();
    
    // Transform the data to our PropertyData format
    return data.listings?.map((listing, index) => ({
      id: index + 1000, // Generate unique IDs
      title: listing.unparsedAddress || 'Property Listing',
      address: listing.unparsedAddress || 'Address not available',
      price: listing.listPrice,
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      area: listing.squareFootage || 0,
      features: [],
      imageUrl: listing.images && listing.images.length > 0 
        ? `https://cdn.repliers.io/${listing.images[0]}` 
        : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2796&auto=format&fit=crop',
      mlsNumber: listing.mlsNumber
    })) || [];
    
  } catch (error) {
    console.error('Error fetching properties from Repliers API:', error);
    return [];
  }
};

export const fetchPropertyDetails = async (mlsNumber: string): Promise<PropertyData | null> => {
  try {
    // Check if we have API settings in localStorage
    const settingsJson = localStorage.getItem('mlsApiSettings');
    if (!settingsJson) {
      console.warn('No MLS API settings found');
      return null;
    }
    
    const settings = JSON.parse(settingsJson);
    const apiKey = settings.apiKey;
    const apiUrl = settings.apiUrl;
    
    if (!apiKey) {
      console.warn('No API key found in settings');
      return null;
    }
    
    // Build request payload
    const requestPayload = {
      mlsNumber,
      operator: "AND",
      status: "A"
    };
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'REPLIERS-API-KEY': apiKey
      },
      body: JSON.stringify(requestPayload)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: RepliersResponse = await response.json();
    
    if (!data.listings || data.listings.length === 0) {
      return null;
    }
    
    const listing = data.listings[0];
    
    // Transform to our PropertyData format
    return {
      id: parseInt(listing.mlsNumber),
      title: listing.unparsedAddress || 'Property Listing',
      address: listing.unparsedAddress || 'Address not available',
      price: listing.listPrice,
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      area: listing.squareFootage || 0,
      features: [],
      imageUrl: listing.images && listing.images.length > 0 
        ? `https://cdn.repliers.io/${listing.images[0]}` 
        : 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2796&auto=format&fit=crop',
      mlsNumber: listing.mlsNumber,
      description: listing.details?.description
    };
    
  } catch (error) {
    console.error('Error fetching property details from Repliers API:', error);
    return null;
  }
};
