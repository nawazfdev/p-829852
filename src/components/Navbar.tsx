
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building, MapPin, Heart, User, LayoutDashboard, Book, DollarSign, Calendar } from "lucide-react";
import Button from "./Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Properties", path: "/properties", icon: <Building size={18} /> },
    { name: "Map", path: "/properties?view=map", icon: <MapPin size={18} /> },
    { name: "Saved", path: "/saved", icon: <Heart size={18} /> },
  ];

  const serviceLinks = [
    { name: "Buyer Guide", path: "/buyer", icon: <Book size={18} /> },
    { name: "Seller Guide", path: "/seller", icon: <DollarSign size={18} /> },
    { name: "Book Now", path: "/book-now", icon: <Calendar size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}

            {/* Dropdown for Services */}
            <div className="relative group">
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center text-foreground/80 hover:text-foreground hover:bg-secondary"
              >
                <span className="mr-2"><User size={18} /></span>
                Services
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center ${
                        isActive(link.path) ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm"
                icon={<LayoutDashboard size={16} />}
              >
                Admin
              </Button>
            </Link>
            <Link to="/signin">
              <Button 
                variant="outline" 
                size="sm"
                icon={<User size={16} />}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            {/* Services section in mobile menu */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-4 py-2 text-sm font-semibold text-gray-500">Services</p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-2 pb-1 space-y-2">
              <Link to="/admin" className="w-full block">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  icon={<LayoutDashboard size={18} />}
                >
                  Admin Dashboard
                </Button>
              </Link>
              <Link to="/signin" className="w-full block">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  icon={<User size={18} />}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="font-display text-xl font-semibold">
        Move<span className="text-primary">Waterloo</span>
      </span>
    </Link>
  );
};

export default Navbar;
