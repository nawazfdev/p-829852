
import React, { useEffect, useRef } from "react";

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Define the initMap function before using it
  const initMap = () => {
    if (mapRef.current && window.google) {
      // Waterloo coordinates
      const waterloo = { lat: 43.4668, lng: -80.5164 };
      
      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        center: waterloo,
        zoom: 13,
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "poi.business",
            "stylers": [{"visibility": "off"}]
          },
          {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
          }
        ]
      });
      
      // Add marker for Waterloo
      new window.google.maps.Marker({
        position: waterloo,
        map: map,
        title: "Waterloo, Ontario"
      });
    }
  };

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && mapRef.current) {
      initMap();
    } else {
      // Load Google Maps script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMapCallback`;
      script.async = true;
      script.defer = true;
      
      // Define global callback
      window.initMapCallback = function() {
        initMap();
      };
      
      document.head.appendChild(script);
    }
    
    return () => {
      // Clean up
      window.initMapCallback = undefined;
    };
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Waterloo Neighborhoods</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the beautiful neighborhoods of Waterloo and find the perfect area for your next home.
          </p>
        </div>
        
        <div 
          ref={mapRef} 
          className="w-full h-[500px] rounded-lg shadow-md"
          style={{ background: "#f0f0f0" }}
        >
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading map...
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Want to learn more about a specific neighborhood? Contact me for detailed insights!
          </p>
        </div>
      </div>
    </section>
  );
};

// Add interface to window
declare global {
  interface Window {
    google: any;
    initMapCallback: () => void;
  }
}

export default LocationMap;
