
import React, { useState } from "react";
import { Quote, Star, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface Testimonial {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
}

const TestimonialSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

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
      text: "Hi all, Just wanted to share a quick shoutout to Paul Mann. He made our home-buying journey a breeze, selling our old house in a week and securing us a fantastic deal on a vacant property. Paul's patience, expertise, and unwavering commitment made the entire process smooth. His negotiation skills were outstanding, always looking out for our best interest. If you're looking to buy or sell property in the region, I can't recommend Paul highly enough.",
      rating: 5
    },
    {
      id: 3,
      name: "Ashley Fernandez",
      date: "November 2023",
      text: "I recently had the pleasure of working with Paul Mann, and I'm thrilled with the outstanding service he provided during my home-buying journey. From helping me choose a preconstruction townhome to navigating the entire purchasing process, Paul's expertise was invaluable. He patiently answered all my questions, addressed concerns, and made sure I felt confident in my decision. If you're searching for a home in Waterloo, I highly recommend reaching out to Paul for his professional guidance and personalized approach.",
      rating: 5
    },
    {
      id: 4,
      name: "Domenic Holly",
      date: "November 2023",
      text: "Paul Mann is an excellent agent that helped me buy my first home. He showed me several houses before we found the perfect one. He also was great at finding houses that fit my budget and style. Throughout the entire process, Paul was professional, responsive, and truly cared about finding me the right home. I would highly recommend Paul to anyone looking to buy a home in the Waterloo area.",
      rating: 5
    },
    {
      id: 5,
      name: "Harman Kang",
      date: "November 2023",
      text: "I had the pleasure of working with Paul Mann from the Riz Team on multiple real estate transactions, and I couldn't be more impressed with his professionalism, dedication, and expertise. Paul consistently went above and beyond to ensure that all my needs were met and that the buying and selling process was as smooth as possible. His knowledge of the Waterloo market is exceptional, and his negotiation skills helped me secure great deals. I highly recommend Paul to anyone looking for a trustworthy and competent real estate agent in the area.",
      rating: 5
    },
    {
      id: 6,
      name: "Mani Kular",
      date: "November 2023",
      text: "I am delighted to express my gratitude for Paul Mann's exceptional performance during our winter home sale, a feat made even more impressive by the challenging weather conditions. When I saw the storm forecast, I was concerned about showing the house, but Paul assured me he would handle everything. True to his word, he arrived early, cleared the driveway, and made our home look welcoming despite the snow. His dedication resulted in multiple offers, and we secured a sale well above our asking price. Paul's commitment to his clients is truly remarkable, and I wholeheartedly recommend him to anyone looking to buy or sell property in Waterloo.",
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
                  <p className="text-foreground/80 relative z-10 pl-6 line-clamp-4">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="link" 
                      className="text-primary p-0 h-auto hover:underline text-sm"
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      Read More
                    </Button>
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

      {/* Full Testimonial Dialog */}
      <Dialog open={selectedTestimonial !== null} onOpenChange={(open) => !open && setSelectedTestimonial(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedTestimonial?.name}</span>
              <span className="text-muted-foreground text-sm font-normal">{selectedTestimonial?.date}</span>
            </DialogTitle>
            <div className="flex mt-1">
              {selectedTestimonial && renderRating(selectedTestimonial.rating)}
            </div>
          </DialogHeader>
          <div className="relative mt-2">
            <Quote className="text-primary/20 h-10 w-10 absolute -top-3 -left-2" />
            <p className="text-foreground/80 relative z-10 pl-8 py-4">
              "{selectedTestimonial?.text}"
            </p>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialSection;
