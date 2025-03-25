
import React from "react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  text: string;
  rating: number;
}

const TestimonialSection = () => {
  // Sample testimonials from clients
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Buyer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&auto=format&fit=crop&q=80",
      text: "Paul went above and beyond to help us find our dream home. His knowledge of the Waterloo market gave us an edge in a competitive situation. Highly recommend!",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "Property Investor",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&auto=format&fit=crop&q=80",
      text: "As an investor, I needed an agent who understood ROI and market trends. Paul's analysis and negotiation skills helped me secure properties with excellent potential.",
      rating: 5
    },
    {
      id: 3,
      name: "Michelle & Robert Taylor",
      role: "Home Sellers",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&auto=format&fit=crop&q=80",
      text: "We were amazed at how quickly Paul sold our home - and above asking price! His marketing strategy and staging advice made all the difference.",
      rating: 5
    }
  ];

  // Function to render star rating
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What My Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I've helped hundreds of families find their dream homes in Waterloo. Here's what some of my clients have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {renderRating(testimonial.rating)}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="text-primary/20 h-8 w-8 absolute -top-2 -left-2" />
                  <p className="text-foreground/80 relative z-10 pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Based on 500+ client reviews with an average rating of 4.9/5
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
