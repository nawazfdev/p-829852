
import React, { ReactNode } from "react";

interface Quote {
  text: string;
  author: string;
  image?: string;
}

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  backgroundImage: string;
  description?: string;
  quote?: Quote;
  overlay?: "light" | "medium" | "dark";
  textColor?: "light" | "dark";
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage,
  description,
  quote,
  overlay = "medium",
  textColor = "light"
}) => {
  // Determine overlay opacity based on the overlay prop
  const overlayClasses = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
  };

  // Determine text color based on the textColor prop
  const textClasses = {
    light: "text-white",
    dark: "text-gray-900",
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={typeof title === 'string' ? title : 'Page header'}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`}></div>
      </div>
      
      {/* Page Title */}
      <div className="container relative z-10 text-center">
        {typeof title === 'string' ? (
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${textClasses[textColor]}`}>{title}</h1>
        ) : (
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${textClasses[textColor]}`}>{title}</h1>
        )}
        
        {subtitle && (
          typeof subtitle === 'string' ? (
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${textColor === "light" ? "text-white/80" : "text-gray-700"}`}>{subtitle}</p>
          ) : (
            <div className={`text-xl md:text-2xl max-w-3xl mx-auto ${textColor === "light" ? "text-white/80" : "text-gray-700"}`}>{subtitle}</div>
          )
        )}
        
        {description && <p className={`text-xl max-w-3xl mx-auto mt-4 ${textColor === "light" ? "text-white/90" : "text-gray-800"}`}>{description}</p>}
      </div>

      {/* Quote */}
      {quote && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-white mx-auto max-w-4xl rounded-t-lg p-8 flex items-center gap-8 shadow-xl">
            {quote.image && (
              <div className="hidden md:block">
                <img 
                  src={quote.image} 
                  alt={quote.author} 
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="text-6xl text-primary/20 font-serif leading-none">"</div>
              <p className="text-lg md:text-xl font-medium text-gray-700 italic">
                "{quote.text}"
              </p>
              <div className="mt-2 font-script text-xl text-right pr-8">
                {quote.author}
              </div>
              <div className="text-6xl text-primary/20 font-serif leading-none text-right">„</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
