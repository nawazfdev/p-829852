
import React from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Badge, Home, Star } from "lucide-react";

const Seller = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <PageHeader
        title="Sell Your Home"
        subtitle="Using Proven Marketing Strategies"
        backgroundImage="https://images.unsplash.com/photo-1560518883-f5c2c9260e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
        quote={{
          text: "If you don't like where you are, move. You are not a tree.",
          author: "Jim Rohn",
          image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop"
        }}
      />
      
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">My Proven Selling Process</h2>
              <p className="text-lg text-muted-foreground mb-8">
                With over 10 years of experience selling homes in Waterloo, I've developed a proven marketing strategy that gets results. My approach combines deep local market knowledge, professional presentation, and aggressive marketing to sell your home quickly and at the best possible price.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Strategic Pricing</h3>
                    <p className="text-muted-foreground">
                      I perform a comprehensive market analysis to determine the optimal listing price for your property, ensuring it attracts serious buyers while maximizing your return on investment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Professional Staging & Photography</h3>
                    <p className="text-muted-foreground">
                      First impressions matter. I arrange professional staging and high-quality photography to showcase your property in its best light, making it stand out in online listings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Multi-Channel Marketing</h3>
                    <p className="text-muted-foreground">
                      I implement a comprehensive marketing plan that includes MLS listings, social media advertising, email marketing to my network of buyers, and targeted digital campaigns to reach the right audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Strategic Open Houses</h3>
                    <p className="text-muted-foreground">
                      I host strategic open houses and private showings to qualified buyers, ensuring maximum exposure while screening for serious offers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">5</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Negotiation</h3>
                    <p className="text-muted-foreground">
                      I leverage my extensive negotiation experience to secure the best possible terms and price for your property, protecting your interests every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Me As Your Selling Agent</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Market Knowledge</h3>
                    </div>
                    <p>Deep understanding of Waterloo's neighborhoods, property values, and market trends to optimize your selling strategy.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Proven Track Record</h3>
                    </div>
                    <p>Over 500 successful transactions with consistently higher-than-average selling prices for my clients.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Home className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Full Service</h3>
                    </div>
                    <p>Comprehensive support from listing to closing, including staging, photography, marketing, and paperwork management.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Client Satisfaction</h3>
                    </div>
                    <p>98% client satisfaction rate with transparent communication, responsiveness, and attention to detail.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Ready to Sell Your Home?</h3>
                <p className="mb-6">I'd love to discuss how I can help you sell your Waterloo property quickly and at the best possible price.</p>
                
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
                  
                  <div className="pt-6">
                    <a 
                      href="/book-now" 
                      className="w-full bg-primary text-white py-3 px-4 rounded-md flex items-center justify-center font-medium hover:bg-primary/90 transition-colors"
                    >
                      Book a Free Home Valuation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                  
                  <div className="pt-4 border-t mt-4">
                    <h4 className="font-medium mb-2">Seller Resources</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">Home Staging Tips</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">Pricing Strategy Guide</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">Selling Timeline</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">Tax Implications When Selling</a>
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

export default Seller;
