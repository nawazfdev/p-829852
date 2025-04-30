import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Buyer = () => {
  const cityRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Animate city names with sequential delays
    const cities = cityRefs.current;
    cities.forEach((city, index) => {
      if (city) {
        city.style.animationDelay = `${index * 0.2}s`;
      }
    });
  }, []);

  const cities = ["Waterloo", "Kitchener", "Cambridge", "Guelph", "Stratford"];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <PageHeader
        title={
          <div className="animated-text">
            <span className="animated-text-item">Buyer Guide</span>
          </div>
        }
        subtitle={
          <div>
            <div className="animated-text-item mb-4">Everything you need to know before buying your home in</div>
            <div className="city-animation mt-2 space-x-3">
              {cities.map((city, index) => (
                <span 
                  key={index}
                  ref={el => cityRefs.current[index] = el}
                  className="city-animation-item text-yellow-400 font-semibold"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  {index > 0 && <span className="text-white mx-1">•</span>}
                  {city}
                </span>
              ))}
            </div>
          </div>
        }
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        quote={{
          text: "If you don't like where you are, move. You are not a tree.",
          author: "Jim Rohn",
          image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
        }}
      />
      
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Home Buying Journey</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Purchasing a home is one of the most significant investments you'll make in your lifetime. As your dedicated real estate agent in Waterloo, I'm here to guide you through each step of the process to ensure you find the perfect home that meets your needs and budget.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Steps to Buying Your Dream Home:</h3>
                <div className="space-y-4 mt-4">
                  {[
                    "Determine your budget and get pre-approved for a mortgage",
                    "Identify your needs and wants in a property",
                    "Begin your property search with my expert guidance",
                    "Tour promising properties in person",
                    "Make an offer on your chosen property",
                    "Navigate the negotiation process",
                    "Complete home inspections and necessary due diligence",
                    "Finalize your mortgage and closing details",
                    "Close on your new home and receive your keys"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Why Waterloo Is Great For Homebuyers</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Waterloo offers an exceptional quality of life with its thriving tech sector, outstanding educational institutions, and vibrant community atmosphere.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Education Excellence</h3>
                    <p>Home to the University of Waterloo and Wilfrid Laurier University, making it perfect for families valuing education.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Tech Hub</h3>
                    <p>Known as "Canada's Silicon Valley" with numerous tech companies and startups offering excellent career opportunities.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Strong Investment</h3>
                    <p>Real estate in Waterloo has shown consistent appreciation, making it a solid long-term investment.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Community Living</h3>
                    <p>Diverse neighborhoods with parks, trails, excellent schools, and community facilities for all ages.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get Personalized Advice</h3>
                <p className="mb-6">Ready to start your home buying journey in Waterloo? Contact me for personalized guidance tailored to your specific needs.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">(519) 555-0123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">paul@movewaterloo.com</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">First-Time Buyer Resources</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">First-Time Home Buyer Incentives</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">Mortgage Pre-Approval Guide</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">Waterloo Neighborhood Guide</a>
                      </li>
                      <li>
                        <a href="/book-now" className="text-primary hover:underline">Book a Free Consultation</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="/" className="font-display text-xl font-semibold text-primary">
                MoveWaterloo
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                Finding your perfect home in Waterloo, simplified.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </a>
              <a href="/properties" className="text-sm text-muted-foreground hover:text-foreground">
                Properties
              </a>
              <a href="/buyer" className="text-sm text-muted-foreground hover:text-foreground">
                Buyer
              </a>
              <a href="/seller" className="text-sm text-muted-foreground hover:text-foreground">
                Seller
              </a>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MoveWaterloo. Paul Mann. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Buyer;
