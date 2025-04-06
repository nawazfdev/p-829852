import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building, MapPin, Heart, User, DollarSign, Book, Calendar, ChevronDown } from "lucide-react";
import Button from "./Button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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

  // Buyer dropdown items
  const buyerLinks = [{
    name: "Buyer",
    path: "/buyer"
  }, {
    name: "Active Listings",
    path: "/properties"
  }, {
    name: "Mortgage Calculator",
    path: "/mortgage-calculator"
  }, {
    name: "Affordability Calculator",
    path: "/affordability-calculator"
  }];

  // Living in dropdown items
  const livingInLinks = [{
    name: "Waterloo",
    path: "/property-city/waterloo"
  }, {
    name: "Paris",
    path: "/property-city/paris"
  }, {
    name: "Ontario",
    path: "/property-city/ontario"
  }, {
    name: "Mississauga",
    path: "/property-city/mississauga"
  }, {
    name: "Milton",
    path: "/property-city/milton"
  }, {
    name: "Brampton",
    path: "/property-city/brampton"
  }, {
    name: "Cambridge",
    path: "/property-city/cambridge"
  }, {
    name: "Kitchener",
    path: "/property-city/kitchener"
  }, {
    name: "Toronto",
    path: "/property-city/toronto"
  }, {
    name: "Woodstock",
    path: "/property-city/woodstock"
  }];
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Navigation menu component for desktop
  const DesktopNavigationMenu = () => <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="my-0">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("/") ? "bg-primary text-primary-foreground" : "")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Buyer Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={isActive("/buyer") || isActive("/properties") || isActive("/mortgage-calculator") || isActive("/affordability-calculator") ? "bg-primary text-primary-foreground" : ""}>
            Buyer <ChevronDown className="h-4 w-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {buyerLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="block p-2 hover:bg-accent rounded-md">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Living in Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={isActive("/property-city") ? "bg-primary text-primary-foreground" : ""}>
            Living in <ChevronDown className="h-4 w-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2 max-h-[400px] overflow-y-auto">
              {livingInLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="block p-2 hover:bg-accent rounded-md">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Regular Links */}
        <NavigationMenuItem>
          <Link to="/book-now">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("/book-now") ? "bg-primary text-primary-foreground" : "")}>
              Book a Call
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/seller">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("/seller") ? "bg-primary text-primary-foreground" : "")}>
              Seller
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/marketing-plan">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive("/marketing-plan") ? "bg-primary text-primary-foreground" : "")}>
              Marketing-Plan
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>;
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-2" : "bg-transparent py-4"}`}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation Menu */}
          <DesktopNavigationMenu />

          {/* YouTube Button */}
          <div className="hidden md:block">
            <a href="https://www.youtube.com/@waterloorealestate" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Watch on YouTube
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-foreground focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden glass animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive("/") ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
              <span className="mr-3"><Home size={18} /></span>
              Home
            </Link>
            
            {/* Buyer Section in mobile */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-4 py-2 text-sm font-semibold text-gray-500">Buyer</p>
              {buyerLinks.map(link => <Link key={link.path} to={link.path} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive(link.path) ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
                  {link.name}
                </Link>)}
            </div>
            
            {/* Living in section in mobile */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-4 py-2 text-sm font-semibold text-gray-500">Living in</p>
              {livingInLinks.map(link => <Link key={link.path} to={link.path} className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive(link.path) ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
                  {link.name}
                </Link>)}
            </div>
            
            {/* Other menu items */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link to="/book-now" className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive("/book-now") ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
                <span className="mr-3"><Calendar size={18} /></span>
                Book a Call
              </Link>
              
              <Link to="/seller" className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive("/seller") ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
                <span className="mr-3"><DollarSign size={18} /></span>
                Seller
              </Link>
              
              <Link to="/marketing-plan" className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${isActive("/marketing-plan") ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground hover:bg-secondary"}`}>
                <span className="mr-3"><Book size={18} /></span>
                Marketing-Plan
              </Link>
            </div>
            
            {/* YouTube button for mobile */}
            <div className="pt-2 pb-1 space-y-2">
              <a href="https://www.youtube.com/@waterloorealestate" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>}
    </header>;
};
const Logo = () => {
  return <Link to="/" className="flex items-center">
      <span className="font-display text-xl font-semibold">
        Move<span className="text-primary">Waterloo</span>
      </span>
    </Link>;
};
export default Navbar;