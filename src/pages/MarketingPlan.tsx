
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import YouTubeSection from "@/components/YouTubeSection";

const MarketingPlan = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Our Marketing Plan"
        description="How we market your property to get the best results"
        imageUrl="https://images.unsplash.com/photo-1563461661026-49631dd5d68e?q=80&w=2069&auto=format&fit=crop"
      />

      <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Marketing Strategy</h2>
            <p className="text-lg text-muted-foreground">
              Our marketing plan is designed to showcase your property to the right buyers and achieve the best possible sale price.
            </p>
          </div>

          <Tabs defaultValue="digital">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="traditional">Traditional</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
            </TabsList>
            
            <TabsContent value="digital">
              <div className="grid md:grid-cols-3 gap-6">
                <MarketingCard 
                  title="Professional Photography" 
                  description="High-quality, professional photos that showcase your home's best features"
                  items={[
                    "Professional HDR photography",
                    "Drone aerial shots",
                    "Virtual staging for empty spaces",
                    "Twilight photography",
                  ]}
                />
                <MarketingCard 
                  title="Virtual Tours & 3D" 
                  description="Immersive digital experiences that bring your home to life online"
                  items={[
                    "Matterport 3D virtual tours",
                    "Interactive floor plans",
                    "Video walk-throughs",
                    "360° room views",
                  ]}
                />
                <MarketingCard 
                  title="Online Marketing" 
                  description="Strategic digital promotion to reach qualified buyers"
                  items={[
                    "Featured listings on MLS",
                    "Social media campaigns",
                    "Email marketing to buyer database",
                    "Targeted online advertising",
                    "Listing syndication across platforms",
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="traditional">
              <div className="grid md:grid-cols-3 gap-6">
                <MarketingCard 
                  title="Signage & Print" 
                  description="Traditional marketing that works alongside digital strategies"
                  items={[
                    "Premium yard signs",
                    "Custom property brochures",
                    "Direct mail campaigns",
                    "Feature sheets at showings",
                  ]}
                />
                <MarketingCard 
                  title="Open Houses" 
                  description="Strategic open houses designed to showcase your property"
                  items={[
                    "Broker open houses",
                    "Public open houses",
                    "Exclusive previews",
                    "Catered events for luxury properties",
                  ]}
                />
                <MarketingCard 
                  title="Local Advertising" 
                  description="Targeted local marketing to reach community buyers"
                  items={[
                    "Local newspaper features",
                    "Community newsletter inclusion",
                    "Local business partnerships",
                    "Neighborhood flyer distribution",
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="network">
              <div className="grid md:grid-cols-3 gap-6">
                <MarketingCard 
                  title="Agent Network" 
                  description="Leveraging professional connections to find buyers"
                  items={[
                    "Agent-to-agent marketing",
                    "Cross-brokerage promotion",
                    "Realtor preview events",
                    "Referral network activation",
                  ]}
                />
                <MarketingCard 
                  title="Buyer Database" 
                  description="Direct marketing to qualified buyers actively looking"
                  items={[
                    "Matching with active buyers",
                    "Previous clients network",
                    "Qualified lead follow-up",
                    "Buyer needs assessment",
                  ]}
                />
                <MarketingCard 
                  title="Professional Network" 
                  description="Connections with related professionals who know buyers"
                  items={[
                    "Mortgage broker referrals",
                    "Attorney and legal referrals",
                    "Relocation specialist partnerships",
                    "Corporate housing connections",
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6">See Our Marketing in Action</h3>
            <YouTubeSection 
              videoId="kFjETSa9N4A"
              title="How We Market Your Home"
              description="Watch this video to see how we implement our marketing strategy for maximum exposure"
            />
          </div>

          <div className="bg-muted p-8 rounded-lg mt-12">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Your Home Marketing Timeline</h3>
              <p className="text-muted-foreground mb-8">
                Our strategic marketing plan follows a proven timeline to ensure maximum exposure at the right time
              </p>
              
              <div className="space-y-8">
                <TimelineItem 
                  day="Day 1-3"
                  title="Property Preparation"
                  description="Professional photography, videography, 3D scanning, and property preparation"
                />
                <TimelineItem 
                  day="Day 4-5"
                  title="Pre-launch Marketing"
                  description="Coming soon announcements, agent network notification, buyer database matching"
                />
                <TimelineItem 
                  day="Day 6-7"
                  title="Official Launch"
                  description="MLS listing goes live, digital marketing campaigns begin, signage installed"
                />
                <TimelineItem 
                  day="Week 2"
                  title="Maximum Exposure"
                  description="Open houses, featured online promotions, social media campaigns"
                />
                <TimelineItem 
                  day="Week 3+"
                  title="Ongoing Marketing & Feedback"
                  description="Marketing statistics review, strategy adjustments, regular seller updates"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-8">
              Let's create a customized marketing plan for your property.
            </p>
            <a href="/book-now" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// Marketing card component
const MarketingCard = ({ title, description, items }: { 
  title: string;
  description: string;
  items: string[];
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Timeline item component
const TimelineItem = ({ day, title, description }: {
  day: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 text-left">
      <div className="w-24 font-bold text-primary">{day}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default MarketingPlan;
