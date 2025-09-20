import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import AddToCartSheet from "./AddToCartSheet";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  category,
  isNew,
  isTrending
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const { t } = useLanguage();

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-secondary text-secondary-foreground">{t('product.new')}</Badge>
        )}
        {isTrending && (
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
        className="absolute top-3 right-3 z-10 bg-card/80 hover:bg-card"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-muted">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Quick View Button */}
        <Link to={`/product/${id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 right-3 bg-card/80 hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => setIsCartSheetOpen(true)}
          className="w-full bg-gradient-primary hover:shadow-glow"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('product.addToCart')}
        </Button>
      </CardFooter>

      <AddToCartSheet
        isOpen={isCartSheetOpen}
        onClose={() => setIsCartSheetOpen(false)}
        product={{ id, name, image, price, category }}
      />
    </Card>
  );
};

export default ProductCard;