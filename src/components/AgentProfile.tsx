import React from "react";
import { Award, Calendar, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
const AgentProfile = () => {
  return <section className="py-16 bg-secondary/20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <div className="relative">
              <img alt="Paul Mann" className="rounded-lg shadow-lg w-full aspect-[4/5] object-cover" src="/lovable-uploads/4983e353-6f2d-4aa8-a439-80275ee4892c.jpg" />
              <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-md shadow font-semibold">
                <Calendar className="inline-block mr-2 h-4 w-4" />
                10+ Years Experience
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Paul Mann</h2>
            <div className="flex items-center mb-6 text-primary">
              <Award className="mr-2 h-5 w-5" />
              <span className="font-medium">Award-Winning Real Estate Broker</span>
            </div>
            
            <p className="text-lg leading-relaxed mb-6">
              With over a decade of experience in the Waterloo real estate market, I've helped hundreds of families find their dream homes. I'm passionate about providing personalized service and expert guidance throughout the entire buying or selling process.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              My deep knowledge of the Waterloo area neighborhoods, market trends, and property values allows me to find the perfect homes for my clients and negotiate the best possible deals. Whether you're looking for your first home, upgrading to accommodate a growing family, or downsizing for retirement, I'll be with you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex items-center" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                (519) 555-0123
              </Button>
              <Button variant="outline" className="flex items-center" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                paul@movewaterloo.com
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold rounded-full w-16 h-16 flex items-center justify-center">
                  500+
                </div>
                <span className="ml-2 text-sm font-medium">Homes Sold</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold rounded-full w-16 h-16 flex items-center justify-center">
                  98%
                </div>
                <span className="ml-2 text-sm font-medium">Client Satisfaction</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 text-primary font-bold rounded-full w-16 h-16 flex items-center justify-center">
                  #1
                </div>
                <span className="ml-2 text-sm font-medium">Waterloo Agent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AgentProfile;