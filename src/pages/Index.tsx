
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import Button from "@/components/Button";

const Index = () => {
  // Sample featured properties
  const featuredProperties: PropertyData[] = [
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
    }
  ];

  // Sample new properties
  const newProperties: PropertyData[] = [
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

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Listings Section */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Properties</h2>
            <Link to="/properties?filter=featured">
              <Button 
                variant="outline"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* New Listings Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">New Listings</h2>
            <Link to="/properties?filter=new">
              <Button 
                variant="outline"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {newProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Your Dream Home Today</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Start your search now and discover the perfect property that meets all your requirements.
          </p>
          <Link to="/properties">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Browse All Properties
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="font-display text-xl font-semibold text-primary">
                EstateVue
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                Finding your perfect home, simplified.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/properties" className="text-sm text-muted-foreground hover:text-foreground">
                Properties
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EstateVue. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
