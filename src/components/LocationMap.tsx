
import React, { useEffect, useRef } from 'react';

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = () => {
      // Waterloo coordinates
      const waterlooCoordinates = { lat: 43.4643, lng: -80.5204 };
      
      // Create map instance
      mapRef.current = new google.maps.Map(mapContainer.current, {
        center: waterlooCoordinates,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7c93a3" }, { lightness: "-10" }]
          },
          {
            featureType: "administrative.country",
            elementType: "geometry",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "administrative.province",
            elementType: "geometry.stroke",
            stylers: [{ color: "#a0c7e3" }, { visibility: "on" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#f7f7f7" }]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#c5d7e3" }]
          }
        ]
      });

      // Add marker for Paul Mann Real Estate
      new google.maps.Marker({
        position: waterlooCoordinates,
        map: mapRef.current,
        title: "Paul Mann Real Estate",
        animation: google.maps.Animation.DROP,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });
    };

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load Google Maps API dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Define the callback function
      window.initMap = initMap;

      return () => {
        // Cleanup
        window.initMap = undefined;
        script.remove();
      };
    }
  }, []);

  return (
    <section className="section-padding">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Me in Waterloo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            With over 10 years of experience in the Waterloo real estate market, I know every neighborhood and property in the area.
          </p>
        </div>
        
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div ref={mapContainer} className="w-full h-[500px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Office Location</h3>
            <p>123 University Avenue<br />Waterloo, ON N2L 3G1</p>
          </div>
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
            <p>Monday - Friday: 9AM - 7PM<br />Saturday: 10AM - 5PM<br />Sunday: By Appointment</p>
          </div>
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
            <p>Phone: (519) 555-0123<br />Email: paul@movewaterloo.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
