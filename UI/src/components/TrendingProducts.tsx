import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TrendingProducts = () => {
  // Mock product data
  const trendingProducts = [
    {
      id: 1,
      name: "Ultra Kitchen Degreaser Pro",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.8,
      reviews: 234,
      category: "Kitchen",
      isTrending: true
    },
    {
      id: 2,
      name: "Eco-Friendly Bathroom Cleaner",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      price: 9.99,
      rating: 4.9,
      reviews: 189,
      category: "Bathroom",
      isNew: true
    },
    {
      id: 3,
      name: "Premium Glass & Mirror Shine",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      price: 8.49,
      rating: 4.7,
      reviews: 156,
      category: "Glass Care",
      isTrending: true
    },
    {
      id: 4,
      name: "Multi-Surface Sanitizer Spray",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      price: 11.49,
      originalPrice: 13.99,
      rating: 4.6,
      reviews: 298,
      category: "Sanitizers"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular cleaning solutions that customers love and trust
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="group">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;