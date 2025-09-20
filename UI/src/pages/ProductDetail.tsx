import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import AddToCartSheet from '@/components/AddToCartSheet';
import { Star, Heart, ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data (in real app, this would come from API)
  const allProducts = [
    {
      id: 1,
      name: "Ultra Kitchen Degreaser Pro",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.8,
      reviews: 234,
      category: "Kitchen",
      isTrending: true,
      description: "Our most powerful kitchen degreaser that cuts through the toughest grease and grime. Perfect for stovetops, ovens, and all kitchen surfaces.",
      features: [
        "Powerful degreasing formula",
        "Safe for all kitchen surfaces",
        "Pleasant citrus scent",
        "Eco-friendly ingredients",
        "Quick-acting formula"
      ],
      ingredients: "Water, Citric Acid, Plant-based Surfactants, Essential Oils",
      usage: "Spray directly on surface, let sit for 30 seconds, then wipe clean with a damp cloth."
    },
    {
      id: 2,
      name: "Eco-Friendly Bathroom Cleaner",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
      price: 9.99,
      rating: 4.9,
      reviews: 189,
      category: "Bathroom",
      isNew: true,
      description: "A gentle yet effective bathroom cleaner that removes soap scum, water stains, and bacteria without harsh chemicals.",
      features: [
        "100% eco-friendly",
        "Removes soap scum effectively",
        "Anti-bacterial properties",
        "Safe for septic systems",
        "Fresh ocean breeze scent"
      ],
      ingredients: "Water, Natural Acids, Plant Extracts, Essential Oils",
      usage: "Apply to surface, scrub if needed, rinse with water."
    },
    // Add other products...
  ];

  const product = allProducts.find(p => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Mock reviews data
  const customerReviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Excellent product! Cleans everything perfectly.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Raj Patel",
      rating: 4,
      comment: "Good quality cleaner, works well on tough stains.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Anita Desai",
      rating: 5,
      comment: "Love the eco-friendly formula. Highly recommended!",
      date: "2024-01-08"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-soft"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-secondary text-secondary-foreground">{t('product.new')}</Badge>
                )}
                {product.isTrending && (
                  <Badge className="bg-accent text-accent-foreground">{t('product.trending')}</Badge>
                )}
                {discount > 0 && (
                  <Badge variant="destructive">{discount}% OFF</Badge>
                )}
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-card/80 hover:bg-card"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={() => setIsCartSheetOpen(true)}
              className="w-full bg-gradient-primary hover:shadow-glow"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t('product.addToCart')}
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <p className="text-muted-foreground">{product.ingredients}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">How to Use</h3>
              <p className="text-muted-foreground">{product.usage}</p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {customerReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? 'fill-accent text-accent'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <AddToCartSheet
        isOpen={isCartSheetOpen}
        onClose={() => setIsCartSheetOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;