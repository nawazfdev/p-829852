
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Building, 
  User, 
  Settings, 
  Plus, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "Properties", path: "/admin/properties", icon: <Building size={20} /> },
    { name: "Add Property", path: "/admin/properties/add", icon: <Plus size={20} /> },
    { name: "MLS Integration", path: "/admin/mls-integration", icon: <Globe size={20} /> },
    { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={`h-screen bg-secondary/10 border-r border-border fixed md:relative z-10 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex justify-between items-center p-4 bg-background">
        <Link 
          to="/" 
          className={`font-display font-semibold text-primary ${collapsed ? "hidden" : "block"}`}
        >
          EstateVue Admin
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="p-2 mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/80"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-8 w-full px-2">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${collapsed ? "px-3" : ""}`}
        >
          <LogOut size={20} className="mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
