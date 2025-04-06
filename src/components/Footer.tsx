
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MoveWaterloo</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in real estate. We help you find the perfect home 
              or sell your property at the best price.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors">
                <Linkedin size={18} />
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
                <span className="text-gray-400">123 Main Street, Waterloo, ON N2L 6R2</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary flex-shrink-0" />
                <span className="text-gray-400">(519) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary flex-shrink-0" />
                <span className="text-gray-400">info@movewaterloo.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MoveWaterloo | Paul Mann Real Estate. All rights reserved.
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
