
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const BookNow = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      serviceType: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", { ...formData, date });
    
    toast({
      title: "Consultation Request Sent",
      description: "Thank you for booking a consultation. I'll get back to you soon!",
    });
    
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-secondary/5">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Consultation</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Schedule a free, no-obligation consultation to discuss your real estate needs. I'm here to help you navigate the Waterloo real estate market with confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              {!formSubmitted ? (
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(123) 456-7890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="serviceType" className="text-sm font-medium">
                            Service Type *
                          </label>
                          <Select 
                            value={formData.serviceType} 
                            onValueChange={handleSelectChange}
                            required
                          >
                            <SelectTrigger id="serviceType">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buyingConsultation">Buying Consultation</SelectItem>
                              <SelectItem value="sellingConsultation">Selling Consultation</SelectItem>
                              <SelectItem value="investmentConsultation">Investment Consultation</SelectItem>
                              <SelectItem value="propertyValuation">Property Valuation</SelectItem>
                              <SelectItem value="other">Other (Specify in Message)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Preferred Date *
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => {
                                  // Disable dates in the past and weekends
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  return (
                                    date < today ||
                                    date.getDay() === 0 // Sunday
                                  );
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell me more about your real estate needs..."
                            className="min-h-32"
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Book Consultation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Consultation Request Sent!</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Thank you for booking a consultation. I'll review your request and contact you within 24 hours to confirm your appointment.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)}>Book Another Consultation</Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Why Book a Consultation?</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>Get expert advice tailored to your specific real estate needs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>Understand current market conditions in Waterloo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>Discover neighborhoods that match your lifestyle and budget</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>Learn about financing options and pre-approval processes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>Get a free home valuation if you're considering selling</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Consultation Details</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Duration</h3>
                        <p className="text-muted-foreground">30-45 minutes</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Format</h3>
                        <p className="text-muted-foreground">In-person, phone, or video call</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Cost</h3>
                        <p className="text-muted-foreground">Free, no obligation</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Available Times</h3>
                        <p className="text-muted-foreground">Monday-Friday: 9am-7pm<br />Saturday: 10am-5pm<br />Sunday: By special arrangement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default BookNow;
