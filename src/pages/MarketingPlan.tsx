
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MarketingPlan = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Marketing Plan"
        description="Our comprehensive marketing strategy to sell your property faster and for the best price"
        backgroundImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1770&auto=format&fit=crop"
      />

      <section className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Proven Marketing Strategy</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage the latest digital marketing techniques combined with traditional methods 
            to ensure your property gets maximum exposure to qualified buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>Professional Photography</CardTitle>
              <CardDescription>High-quality visuals that sell</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We employ professional photographers to capture stunning HDR photos, 
                360° virtual tours, and drone footage that showcase your property in its best light.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>High-resolution photographs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Immersive 3D virtual tours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Aerial drone photography</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>Digital Marketing</CardTitle>
              <CardDescription>Targeted online campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We create targeted online marketing campaigns to reach potential buyers 
                across multiple platforms and drive qualified traffic to your listing.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Social media advertising</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Email marketing campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Google Ads for real estate searches</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>MLS & Websites</CardTitle>
              <CardDescription>Maximum online exposure</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We ensure your property is featured prominently on MLS and the top real estate 
                websites where serious buyers are searching.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Featured listing on MLS</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Realtor.ca enhanced listing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Syndication to top real estate sites</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>Print Marketing</CardTitle>
              <CardDescription>Traditional methods that work</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We complement our digital efforts with strategic print marketing to 
                maximize local exposure and reach all potential buyers.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Professional brochures</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Direct mail campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Feature sheets and postcards</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>Open Houses</CardTitle>
              <CardDescription>Strategically planned events</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We organize well-planned open houses that attract serious buyers and 
                create opportunities for offers.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Strategic timing for maximum attendance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Professional hosting and follow-up</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Digital sign-in for lead capture</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-primary">
            <CardHeader>
              <CardTitle>Agent Network</CardTitle>
              <CardDescription>Professional connections</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We leverage our extensive network of real estate professionals to 
                bring qualified buyers to your property.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Agent open houses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Broker-to-broker marketing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Referral network promotion</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground">
              Let's create a customized marketing plan for your property.
            </p>
          </div>
          <Button size="lg" className="mt-4 md:mt-0">
            Book a Consultation
          </Button>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gray-100 py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">See Our Marketing in Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch this short video showcasing how we market properties to achieve exceptional results.
            </p>
          </div>
          
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Our Marketing Strategy" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketingPlan;
