import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-banner.jpg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: heroImage,
      title: "Welcome to HealthyShine",
      subtitle: "Where Clean Meets Shine",
      description: "Discover our premium collection of eco-friendly cleaning products that make your home sparkle while protecting your family and the environment.",
      cta: "Shop Now"
    },
    {
      id: 2,
      image: heroImage,
      title: "Premium Quality Guaranteed",
      subtitle: "Trusted by Thousands",
      description: "Join millions of satisfied customers who trust HealthyShine for their cleaning needs. Experience the difference quality makes.",
      cta: "Learn More"
    },
    {
      id: 3,
      image: heroImage,
      title: "Eco-Friendly Solutions",
      subtitle: "Clean Conscience, Clean Home",
      description: "Our biodegradable formulas are safe for your family and kind to the planet. Clean green with HealthyShine.",
      cta: "Go Green"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[70vh] overflow-hidden bg-gradient-hero">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4">
                <div className="animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Button size="lg" className="bg-gradient-shine hover:shadow-glow">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 hover:bg-card shadow-medium"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 hover:bg-card shadow-medium"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary shadow-glow"
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-card/90 rounded-lg px-3 py-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-2">4.9/5 from 2,847 reviews</span>
      </div>
    </div>
  );
};

export default HeroCarousel;