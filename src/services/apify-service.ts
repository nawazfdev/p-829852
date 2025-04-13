
/**
 * Service for interacting with Apify's Realtor.ca Canada Property & Agent Scraper
 */

// Define the property data structure based on Apify's response
export interface RealtorProperty {
  Id: string;
  MlsNumber: string;
  PublicRemarks: string;
  Building: {
    BathroomTotal: string;
    Bedrooms: string;
    SizeInterior: string;
    StoriesTotal: string;
    Type: string;
    FloorAreaMeasurements?: Array<{
      Area: string;
      AreaUnformatted: string;
      Type: string;
      Source: string;
      MeasureUnitId: string;
      TypeId: string;
      SourceId: string;
      SortBy: string;
    }>;
  };
  Individual?: Array<{
    IndividualID: number;
    Name: string;
    Position: string;
    FirstName: string;
    LastName: string;
    Photo?: string;
    PhotoHighRes?: string;
    Organization?: {
      OrganizationID: number;
      Name: string;
      Address?: {
        AddressText: string;
      };
      Phones?: Array<{
        PhoneType: string;
        PhoneNumber: string;
        AreaCode: string;
      }>;
    };
    Phones?: Array<{
      PhoneType: string;
      PhoneNumber: string;
      AreaCode: string;
    }>;
    Emails?: Array<{
      ContactId: string;
    }>;
    Websites?: Array<{
      Website: string;
      WebsiteTypeId: string;
    }>;
  }>;
  Property: {
    Price: string;
    Type: string;
    Address: {
      AddressText: string;
      Longitude: string;
      Latitude: string;
      PermitShowAddress: boolean;
    };
    Photo?: Array<{
      SequenceId: string;
      HighResPath: string;
      MedResPath: string;
      LowResPath: string;
      LastUpdated: string;
      TypeId: string;
    }>;
    Parking?: Array<{
      Name: string;
    }>;
    ParkingSpaceTotal?: string;
    TypeId: string;
    OwnershipType: string;
    OwnershipTypeGroupIds?: number[];
    ParkingType?: string;
    PriceUnformattedValue: string;
    ShortValue?: string;
  };
  Land?: {
    SizeTotal?: string;
    SizeFrontage?: string;
  };
  AlternateURL?: {
    VideoLink?: string;
  };
  PostalCode?: string;
  ProvinceName?: string;
  RelativeDetailsURL?: string;
  Media?: Array<{
    MediaCategoryId: string;
    MediaCategoryURL: string;
    Description: string;
    Order: number;
    VideoType?: string;
  }>;
  TimeOnRealtor?: string;
  Tags?: Array<{
    Label: string;
    HTMLColorCode: string;
    ListingTagTypeID: string;
  }>;
}

// Define the search parameters for property search
export interface PropertySearchParams {
  city?: string;
  province?: string;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  propertyType?: string;
  maxItems?: number;
}

// Convert RealtorProperty to our app's PropertyData format for consistency
export function convertToPropertyData(property: RealtorProperty): any {
  // Extract the main image URL or use a placeholder
  const mainPhotoUrl = property.Property.Photo && property.Property.Photo.length > 0
    ? property.Property.Photo[0].HighResPath
    : "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop";

  // Clean up address text
  const addressText = property.Property.Address.AddressText.replace(/\|/g, ", ");

  // Parse numeric values
  const bedrooms = parseInt(property.Building.Bedrooms) || 0;
  const bathrooms = parseFloat(property.Building.BathroomTotal) || 0;
  const price = parseInt(property.Property.PriceUnformattedValue) || 0;

  // Extract area (square footage)
  let area = 0;
  if (property.Building.FloorAreaMeasurements && property.Building.FloorAreaMeasurements.length > 0) {
    const areaText = property.Building.FloorAreaMeasurements[0].AreaUnformatted;
    if (areaText) {
      // Try to extract the numeric part
      const match = areaText.match(/(\d+)/);
      if (match) {
        area = parseInt(match[0]);
      }
    }
  }

  // Extract features from public remarks
  const features = [];
  if (property.Property.ParkingType && property.Property.ParkingType !== "No Garage") {
    features.push(property.Property.ParkingType);
  }
  
  // Extract ownership type
  if (property.Property.OwnershipType) {
    features.push(property.Property.OwnershipType);
  }

  // Add property type as a feature
  if (property.Property.Type) {
    features.push(property.Property.Type);
  }

  // Return the converted property data
  return {
    id: parseInt(property.Id),
    title: property.Building.Type || "Property",
    address: addressText,
    price: price,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    area: area || 1000, // Default area if not available
    features: features,
    imageUrl: mainPhotoUrl,
    mlsNumber: property.MlsNumber,
    description: property.PublicRemarks,
    longitude: parseFloat(property.Property.Address.Longitude),
    latitude: parseFloat(property.Property.Address.Latitude),
    agent: property.Individual && property.Individual.length > 0 ? {
      name: property.Individual[0].Name,
      photo: property.Individual[0].Photo,
      position: property.Individual[0].Position,
      organization: property.Individual[0].Organization?.Name,
      phone: property.Individual[0].Phones && property.Individual[0].Phones.length > 0 ? 
        `${property.Individual[0].Phones[0].AreaCode}-${property.Individual[0].Phones[0].PhoneNumber}` : "",
    } : undefined,
  };
}

/**
 * Fetch properties from Apify's Realtor.ca Scraper
 */
export async function fetchPropertiesFromApify(searchParams: PropertySearchParams = {}): Promise<any[]> {
  try {
    // Set the Apify API token
    const APIFY_TOKEN = "apify_api_213Dahodf5lgQoARYQUO1aAjgni5NP0lv341";
    
    // Construct the search URL based on parameters
    // For now, we'll use a default URL but this could be customized based on searchParams
    const baseUrl = "https://www.realtor.ca/map#ZoomLevel=10&Center=45.250322%2C-75.799950&LatitudeMax=45.70243&LongitudeMax=-75.06867&LatitudeMin=44.79459&LongitudeMin=-76.53123&Sort=6-D&PGeoIds=g30_f241etq5&GeoName=Ottawa%2C%20ON&PropertyTypeGroupID=1&TransactionTypeId=2&PropertySearchTypeId=0&Currency=CAD";
    
    // Prepare the input for the Apify API call
    const input = {
      startUrls: [
        {
          url: baseUrl
        }
      ],
      proxy: {
        useApifyProxy: true,
        apifyProxyGroups: ["RESIDENTIAL"]
      },
      maxItems: searchParams.maxItems || 100,
      maxConcurrency: 10,
      minConcurrency: 1,
      maxRequestRetries: 100
    };

    // Make the API request to Apify
    console.log("Fetching properties from Apify...");
    const response = await fetch(`https://api.apify.com/v2/acts/memo23~realtor-canada-search-cheerio/run-sync-get-dataset-items?token=${APIFY_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
    }

    // Parse the response
    const data = await response.json();
    
    // Convert the properties to our app's format
    const convertedProperties = Array.isArray(data) 
      ? data.map(property => convertToPropertyData(property))
      : [];

    console.log(`Fetched ${convertedProperties.length} properties from Apify`);
    return convertedProperties;
  } catch (error) {
    console.error("Error fetching properties from Apify:", error);
    return [];
  }
}
