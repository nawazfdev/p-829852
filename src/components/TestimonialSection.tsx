
import React from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
}

const TestimonialSection = () => {
  // Real testimonials from clients
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Harmen Mahil",
      date: "November 2023",
      text: "I cannot express enough gratitude for the exceptional service I received from Paul Mann. As a full-time accountant, I was seeking a passive business venture, and Paul guided me seamlessly through the process.",
      rating: 5
    },
    {
      id: 2,
      name: "Moni Kooner",
      date: "November 2023",
      text: "Hi all, Just wanted to share a quick shoutout to Paul Mann. He made our home-buying journey a breeze, selling our old house in a week and securing us a fantastic deal on a vacant property. Paul's patience...",
      rating: 5
    },
    {
      id: 3,
      name: "Ashley Fernandez",
      date: "November 2023",
      text: "I recently had the pleasure of working with Paul Mann, and I'm thrilled with the outstanding service he provided during my home-buying journey. From helping me choose a preconstruction townhome to...",
      rating: 5
    },
    {
      id: 4,
      name: "Domenic Holly",
      date: "November 2023",
      text: "Paul Mann is an excellent agent that helped me buy my first home. He showed me several houses before we found the perfect one. He also was great at finding houses that fit my budget and style.",
      rating: 5
    },
    {
      id: 5,
      name: "Harman Kang",
      date: "November 2023",
      text: "I had the pleasure of working with Paul Mann from the Riz Team on multiple real estate transactions, and I couldn't be more impressed with his professionalism, dedication, and expertise. Paul...",
      rating: 5
    },
    {
      id: 6,
      name: "Mani Kular",
      date: "November 2023",
      text: "I am delighted to express my gratitude for Paul Mann's exceptional performance during our winter home sale, a feat made even more impressive by the challenging weather conditions. When I saw the storm...",
      rating: 5
    }
  ];

  // Function to render star rating
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          strokeWidth={1.5}
        />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-scale">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-muted-foreground text-sm">{testimonial.date}</p>
                  <div className="flex mt-1">
                    {renderRating(testimonial.rating)}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="text-primary/20 h-8 w-8 absolute -top-2 -left-2" />
                  <p className="text-foreground/80 relative z-10 pl-6">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-4">
                    <button className="text-primary hover:underline text-sm">
                      Read More
                    </button>
                  </div>
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
