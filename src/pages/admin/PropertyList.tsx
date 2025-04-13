
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash, Eye, Plus, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchPropertiesFromApify } from "@/services/apify-service";

const PropertyList = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  // Fetch properties from Apify API when component mounts
  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      try {
        const apifyProperties = await fetchPropertiesFromApify();
        
        if (apifyProperties && apifyProperties.length > 0) {
          // Add random status for admin functionality
          const statusOptions = ["Active", "Pending", "Draft"];
          const propertiesWithStatus = apifyProperties.map(prop => ({
            ...prop,
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
          }));
          
          setProperties(propertiesWithStatus);
          setFilteredProperties(propertiesWithStatus);
          toast({
            title: "Properties loaded",
            description: `${propertiesWithStatus.length} properties loaded from Realtor.ca via Apify.`,
          });
        } else {
          // Fallback to static properties if API fails
          const staticProperties = [
            { id: 1, title: "Modern Apartment in Downtown", price: "$350,000", type: "Apartment", bedrooms: 2, status: "Active" },
            { id: 2, title: "Family Home with Garden", price: "$520,000", type: "House", bedrooms: 4, status: "Active" },
            { id: 3, title: "Luxury Penthouse", price: "$1,200,000", type: "Penthouse", bedrooms: 3, status: "Pending" },
            { id: 4, title: "Cozy Studio near University", price: "$180,000", type: "Studio", bedrooms: 1, status: "Active" },
            { id: 5, title: "Waterfront Villa", price: "$2,500,000", type: "Villa", bedrooms: 5, status: "Draft" },
          ];
          setProperties(staticProperties);
          setFilteredProperties(staticProperties);
          toast({
            title: "Using static properties",
            description: "Could not load properties from API. Using static data instead.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({
          title: "Error",
          description: "Failed to load properties. Using static data instead.",
          variant: "destructive"
        });
        // Use static properties as fallback
        const staticProperties = [
          { id: 1, title: "Modern Apartment in Downtown", price: "$350,000", type: "Apartment", bedrooms: 2, status: "Active" },
          { id: 2, title: "Family Home with Garden", price: "$520,000", type: "House", bedrooms: 4, status: "Active" },
          { id: 3, title: "Luxury Penthouse", price: "$1,200,000", type: "Penthouse", bedrooms: 3, status: "Pending" },
          { id: 4, title: "Cozy Studio near University", price: "$180,000", type: "Studio", bedrooms: 1, status: "Active" },
          { id: 5, title: "Waterfront Villa", price: "$2,500,000", type: "Villa", bedrooms: 5, status: "Draft" },
        ];
        setProperties(staticProperties);
        setFilteredProperties(staticProperties);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, [toast]);

  // Filter properties based on search term and status
  useEffect(() => {
    let result = [...properties];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(property => 
        property.title.toLowerCase().includes(term) || 
        property.address?.toLowerCase().includes(term) || 
        property.type?.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (status !== "all") {
      result = result.filter(property => property.status === status);
    }
    
    setFilteredProperties(result);
  }, [searchTerm, status, properties]);

  const handleDelete = (id: number) => {
    toast({
      title: "Not implemented yet",
      description: `This would delete property #${id}. Connect to Supabase to implement this functionality.`,
    });
  };

  // Count properties by status
  const getStatusCount = (statusType: string) => {
    if (statusType === "all") {
      return properties.length;
    }
    return properties.filter(p => p.status === statusType).length;
  };

  // Format price for display
  const formatPrice = (price: number | string) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    }
    return price; // If it's already a string
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Link to="/admin/properties/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search properties..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={status === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatus("all")}
          >
            All ({getStatusCount("all")})
          </Button>
          <Button 
            variant={status === "Active" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatus("Active")}
          >
            Active ({getStatusCount("Active")})
          </Button>
          <Button 
            variant={status === "Pending" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatus("Pending")}
          >
            Pending ({getStatusCount("Pending")})
          </Button>
          <Button 
            variant={status === "Draft" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatus("Draft")}
          >
            Draft ({getStatusCount("Draft")})
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading properties...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{formatPrice(property.price)}</TableCell>
                    <TableCell>{property.type || property.features?.[0] || "N/A"}</TableCell>
                    <TableCell>{property.bedrooms}</TableCell>
                    <TableCell>
                      <div className={`px-2 py-1 rounded-full text-xs inline-block font-medium
                        ${property.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {property.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/property/${property.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/properties/edit/${property.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No properties found. Try adjusting your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
