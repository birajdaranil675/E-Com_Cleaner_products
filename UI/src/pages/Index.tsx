import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import TrendingProducts from "@/components/TrendingProducts";
import CustomerReviews from "@/components/CustomerReviews";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroCarousel />
        <TrendingProducts />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
