
import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import Button from "./Button";

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

const ImageGallery = ({ images, className = "" }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  
  if (images.length === 0) {
    return (
      <div className={`rounded-lg bg-muted flex items-center justify-center h-80 ${className}`}>
        No images available
      </div>
    );
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  // Gallery in fullscreen mode
  if (fullscreen) {
    return (
      <div 
        className="fixed inset-0 bg-background/95 z-50 backdrop-blur-xl flex items-center justify-center cursor-pointer animate-fade-in"
        onClick={toggleFullscreen}
      >
        <div className="absolute top-4 right-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            icon={<X size={18} />}
          >
            Close
          </Button>
        </div>
        
        <div 
          className="relative flex items-center justify-center w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handlePrev}
            className="absolute left-4 z-10 p-2 rounded-full glass text-foreground hover:bg-secondary"
          >
            <ArrowLeft size={24} />
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt={`Property image ${currentIndex + 1}`} 
            className="max-h-full max-w-full object-contain px-16"
          />
          
          <button 
            onClick={handleNext}
            className="absolute right-4 z-10 p-2 rounded-full glass text-foreground hover:bg-secondary"
          >
            <ArrowRight size={24} />
          </button>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="glass rounded-full px-4 py-2 flex space-x-2">
              {images.map((_, index) => (
                <button 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex 
                      ? "bg-primary" 
                      : "bg-muted-foreground"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular gallery view
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Fullscreen toggle */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full glass text-foreground hover:bg-secondary"
        onClick={toggleFullscreen}
      >
        <Expand size={18} />
      </button>
      
      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={handlePrev}
          className="p-2 rounded-full glass text-foreground hover:bg-secondary"
        >
          <ArrowLeft size={20} />
        </button>
        
        <button 
          onClick={handleNext}
          className="p-2 rounded-full glass text-foreground hover:bg-secondary"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex space-x-2 mt-2 overflow-x-auto hide-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-md ${
                index === currentIndex ? "ring-2 ring-primary" : "opacity-70"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
