
import React from "react";
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
import { Edit, Trash, Eye, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const PropertyList = () => {
  const { toast } = useToast();

  // In the future, this would come from Supabase
  const properties = [
    { id: 1, title: "Modern Apartment in Downtown", price: "$350,000", type: "Apartment", bedrooms: 2, status: "Active" },
    { id: 2, title: "Family Home with Garden", price: "$520,000", type: "House", bedrooms: 4, status: "Active" },
    { id: 3, title: "Luxury Penthouse", price: "$1,200,000", type: "Penthouse", bedrooms: 3, status: "Pending" },
    { id: 4, title: "Cozy Studio near University", price: "$180,000", type: "Studio", bedrooms: 1, status: "Active" },
    { id: 5, title: "Waterfront Villa", price: "$2,500,000", type: "Villa", bedrooms: 5, status: "Draft" },
  ];

  const handleDelete = (id: number) => {
    toast({
      title: "Not implemented yet",
      description: `This would delete property #${id}. Connect to Supabase to implement this functionality.`,
    });
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
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            All ({properties.length})
          </Button>
          <Button variant="outline" size="sm">
            Active (3)
          </Button>
          <Button variant="outline" size="sm">
            Pending (1)
          </Button>
          <Button variant="outline" size="sm">
            Draft (1)
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
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
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.type}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyList;
