import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useLanguage();

  const categories = [
    { key: "All", label: t('common.all') },
    { key: "Kitchen", label: t('common.kitchen') },
    { key: "Bathroom", label: t('common.bathroom') },
    { key: "Glass Care", label: t('common.glassCare') },
    { key: "Floor Care", label: t('common.floorCare') },
    { key: "Sanitizers", label: t('common.sanitizers') }
  ];

  const allProducts = [
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
    },
    {
      id: 5,
      name: "Heavy Duty Floor Cleaner",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      price: 14.99,
      rating: 4.5,
      reviews: 167,
      category: "Floor Care",
      isNew: true
    },
    {
      id: 6,
      name: "Gentle Marble & Stone Care",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.9,
      reviews: 89,
      category: "Floor Care"
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('products.title')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 mr-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{t('products.filter')}</span>
          </div>
          {categories.map((category) => (
            <Badge
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t('products.showing')} {filteredProducts.length} {filteredProducts.length === 1 ? t('products.product') : t('products.products')}
            {selectedCategory !== "All" && ` ${t('products.in')} ${categories.find(c => c.key === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              {t('products.noResults')}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              {t('products.clearFilters')}
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;