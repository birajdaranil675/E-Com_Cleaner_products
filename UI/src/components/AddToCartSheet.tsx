import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface AddToCartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
  } | null;
}

const AddToCartSheet: React.FC<AddToCartSheetProps> = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250ml');
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const sizes = [
    { value: '250ml', label: '250ml', priceMultiplier: 1 },
    { value: '500ml', label: '500ml', priceMultiplier: 1.8 },
    { value: '1l', label: '1 Liter', priceMultiplier: 3.2 },
    { value: '5l', label: '5 Liter', priceMultiplier: 14 },
  ];

  const selectedSizeData = sizes.find(size => size.value === selectedSize);
  const finalPrice = product ? product.price * (selectedSizeData?.priceMultiplier || 1) : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        { ...product, price: finalPrice },
        quantity,
        selectedSize
      );
      onClose();
      setQuantity(1);
      setSelectedSize('250ml');
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-primary">{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {product?.name}
          </SheetDescription>
        </SheetHeader>

        {product && (
          <div className="py-6 space-y-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg shadow-soft"
              />
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label htmlFor="size" className="text-sm font-medium">
                {t('cart.size')}
              </Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <div className="flex justify-between items-center w-full">
                        <span>{size.label}</span>
                        <span className="ml-4 text-muted-foreground">
                          ${(product.price * size.priceMultiplier).toFixed(2)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">
                {t('cart.quantity')}
              </Label>
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Price per unit:</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>{t('cart.total')}:</span>
                <span className="text-primary">${(finalPrice * quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <SheetFooter>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-primary hover:shadow-glow"
            disabled={!product}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('cart.add')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddToCartSheet;