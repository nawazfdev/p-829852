
import React from "react";

interface Quote {
  text: string;
  author: string;
  image?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  description?: string;  // Added description prop
  quote?: Quote;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage,
  description,  // Added description in destructuring
  quote 
}) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Page Title */}
      <div className="container relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/80">{subtitle}</p>}
        {description && <p className="text-xl max-w-3xl mx-auto text-white/90 mt-4">{description}</p>}
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
