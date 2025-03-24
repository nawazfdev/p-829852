
import { ArrowRight } from "lucide-react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          alt="Luxury Real Estate"
          className="object-cover w-full h-full"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="container relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Find Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
            Explore premium properties and find the perfect place to call home. Browse our curated selection of exclusive listings.
          </p>

          <div className="max-w-2xl">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties?filter=new">
              <Button variant="secondary" size="lg">
                New Listings
              </Button>
            </Link>
            <Link to="/properties?filter=luxury">
              <Button variant="secondary" size="lg">
                Luxury Homes
              </Button>
            </Link>
            <Link to="/properties">
              <Button 
                variant="primary"
                size="lg" 
                className="ml-2" 
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
