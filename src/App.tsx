
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import PropertyList from "./pages/admin/PropertyList";
import PropertyForm from "./pages/admin/PropertyForm";
import ProfileSettings from "./pages/admin/ProfileSettings";
import MLSIntegration from "./pages/admin/MLSIntegration";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import BookNow from "./pages/BookNow";

// Set the document title
document.title = "MoveWaterloo | Paul Mann Real Estate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/book-now" element={<BookNow />} />
          <Route path="/mortgage-calculator" element={<NotFound />} />
          <Route path="/affordability-calculator" element={<NotFound />} />
          <Route path="/marketing-plan" element={<NotFound />} />
          
          {/* Property City Routes */}
          <Route path="/property-city/:city" element={<Properties />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/add" element={<PropertyForm />} />
            <Route path="properties/edit/:id" element={<PropertyForm />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="mls-integration" element={<MLSIntegration />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
