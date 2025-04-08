
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MoveWaterloo</h3>
            <p className="text-gray-400 mb-4">
              Paul Mann is an accredited real estate broker with nearly two decades of experience, 
              helping clients with their real estate needs in Kitchener-Waterloo and the surrounding areas. 
              A recipient of the Lifetime Achievement Award and a member of the Real Estate Hall of Fame, 
              Paul is known for delivering exceptional service, honest guidance, and proven results.
            </p>
            <div className="flex space-x-3 mt-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@waterloorealestate" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/buyer" className="text-gray-400 hover:text-white transition-colors">
                  Buyer
                </Link>
              </li>
              <li>
                <Link to="/seller" className="text-gray-400 hover:text-white transition-colors">
                  Seller
                </Link>
              </li>
              <li>
                <Link to="/mortgage-calculator" className="text-gray-400 hover:text-white transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/affordability-calculator" className="text-gray-400 hover:text-white transition-colors">
                  Affordability Calculator
                </Link>
              </li>
              <li>
                <Link to="/marketing-plan" className="text-gray-400 hover:text-white transition-colors">
                  Marketing Plan
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cities */}
          <div>
            <h3 className="text-xl font-bold mb-4">Living In</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/property-city/waterloo" className="text-gray-400 hover:text-white transition-colors">
                  Waterloo
                </Link>
              </li>
              <li>
                <Link to="/property-city/kitchener" className="text-gray-400 hover:text-white transition-colors">
                  Kitchener
                </Link>
              </li>
              <li>
                <Link to="/property-city/cambridge" className="text-gray-400 hover:text-white transition-colors">
                  Cambridge
                </Link>
              </li>
              <li>
                <Link to="/property-city/toronto" className="text-gray-400 hover:text-white transition-colors">
                  Toronto
                </Link>
              </li>
              <li>
                <Link to="/property-city/mississauga" className="text-gray-400 hover:text-white transition-colors">
                  Mississauga
                </Link>
              </li>
              <li>
                <Link to="/property-city/brampton" className="text-gray-400 hover:text-white transition-colors">
                  Brampton
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-400">PO Box 37006 Kitchener RPO Stanley Park, ON, N2A 4A7</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary flex-shrink-0" />
                <a href="tel:+16472911900" className="text-gray-400 hover:text-white transition-colors">+1 647.291.1900</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary flex-shrink-0" />
                <a href="mailto:info@movetowaterloo.com" className="text-gray-400 hover:text-white transition-colors">info@movetowaterloo.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © {currentYear} MoveWaterloo All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Site Map</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
