
import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const YouTubeSection = () => {
  // Real videos from Paul Mann's channel
  const videos = [
    {
      id: "nQN6pg1XSgk", // Actual video from Paul's channel
      title: "Waterloo Real Estate Market Update",
      description: "Latest trends and insights in the Waterloo real estate market"
    },
    {
      id: "nQN6pg1XSgk", // Using same ID as placeholder until more videos are provided
      title: "Home Buying Tips in Waterloo",
      description: "Essential tips for first-time homebuyers in Waterloo"
    },
    {
      id: "nQN6pg1XSgk", // Using same ID as placeholder until more videos are provided
      title: "Investment Properties in Waterloo",
      description: "Why Waterloo is great for real estate investment"
    }
  ];

  return (
    <section className="section-padding bg-secondary/10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My YouTube Channel</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to my YouTube channel for the latest real estate tips, market updates, and property tours in Waterloo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card key={`${video.id}-${index}`} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${video.id}`} 
                  title={video.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-t-lg"
                ></iframe>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{video.description}</p>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary font-medium flex items-center hover:underline"
                >
                  Watch on YouTube
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open("https://youtu.be/nQN6pg1XSgk?si=DQHu1FMLhrDp6cdl", "_blank")}
            className="px-6"
          >
            Visit My YouTube Channel
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
