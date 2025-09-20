import { Link } from "react-router-dom";
import { Sparkles, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import contactInfo from "@/resources/contactInfo.json";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                HealthyShine
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Making your world cleaner, healthier, and brighter with our premium cleaning products.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-primary-soft rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="p-2 bg-primary-soft rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="p-2 bg-primary-soft rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Instagram className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Products
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Products</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors">
                Kitchen Cleaners
              </p>
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors">
                Bathroom Cleaners
              </p>
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors">
                Floor Care
              </p>
              <p className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors">
                Glass & Windows
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">{contactInfo.social.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">{contactInfo.social.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">{contactInfo.location.address}, {contactInfo.location.city}, {contactInfo.location.state} - {contactInfo.location.zip}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 HealthyShine. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;