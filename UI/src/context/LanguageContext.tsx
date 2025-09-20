import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mr';

interface Translations {
  en: { [key: string]: string };
  mr: { [key: string]: string };
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.cart': 'Cart',
    
    // Home Page
    'home.hero.title': 'Welcome to HealthyShine',
    'home.hero.subtitle': 'Premium Cleaning Solutions for a Healthier Life',
    'home.trending.title': 'Trending Products',
    'home.reviews.title': 'What Our Customers Say',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'Discover our complete range of premium cleaning solutions',
    'products.search': 'Search products...',
    'products.filter': 'Filter by:',
    'products.showing': 'Showing',
    'products.product': 'product',
    'products.products': 'products',
    'products.in': 'in',
    'products.noResults': 'No products found matching your criteria',
    'products.clearFilters': 'Clear Filters',
    
    // Product Card
    'product.new': 'New',
    'product.trending': 'Trending',
    'product.addToCart': 'Add to Cart',
    'product.adding': 'Adding...',
    'product.viewDetails': 'View Details',
    
    // Cart
    'cart.title': 'Add to Cart',
    'cart.quantity': 'Quantity',
    'cart.size': 'Size',
    'cart.add': 'Add to Cart',
    'cart.total': 'Total',
    'cart.items': 'items',
    'cart.checkout': 'Checkout',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.userManagement': 'User Management',
    'admin.orderManagement': 'Order Management',
    'admin.productManagement': 'Product Management',
    
    // Common
    'common.all': 'All',
    'common.kitchen': 'Kitchen',
    'common.bathroom': 'Bathroom',
    'common.glassCare': 'Glass Care',
    'common.floorCare': 'Floor Care',
    'common.sanitizers': 'Sanitizers',
  },
  mr: {
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.products': 'उत्पादने',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.admin': 'प्रशासक',
    'nav.cart': 'कार्ट',
    
    // Home Page
    'home.hero.title': 'हेल्दीशाईनमध्ये आपले स्वागत',
    'home.hero.subtitle': 'निरोगी जीवनासाठी प्रीमियम साफसफाईचे उपाय',
    'home.trending.title': 'लोकप्रिय उत्पादने',
    'home.reviews.title': 'आमच्या ग्राहकांचे मत',
    
    // Products
    'products.title': 'आमची उत्पादने',
    'products.subtitle': 'प्रीमियम साफसफाईच्या उपायांची आमची संपूर्ण श्रेणी शोधा',
    'products.search': 'उत्पादने शोधा...',
    'products.filter': 'फिल्टर करा:',
    'products.showing': 'दाखवत आहे',
    'products.product': 'उत्पादन',
    'products.products': 'उत्पादने',
    'products.in': 'मध्ये',
    'products.noResults': 'आपल्या निकषांशी जुळणारी कोणतीही उत्पादने आढळली नाहीत',
    'products.clearFilters': 'फिल्टर साफ करा',
    
    // Product Card
    'product.new': 'नवीन',
    'product.trending': 'लोकप्रिय',
    'product.addToCart': 'कार्टमध्ये जोडा',
    'product.adding': 'जोडत आहे...',
    'product.viewDetails': 'तपशील पहा',
    
    // Cart
    'cart.title': 'कार्टमध्ये जोडा',
    'cart.quantity': 'मात्रा',
    'cart.size': 'आकार',
    'cart.add': 'कार्टमध्ये जोडा',
    'cart.total': 'एकूण',
    'cart.items': 'वस्तू',
    'cart.checkout': 'चेकआउट',
    'cart.empty': 'तुमचे कार्ट रिकामे आहे',
    'cart.continueShopping': 'खरेदी सुरू ठेवा',
    
    // Admin
    'admin.title': 'प्रशासक डॅशबोर्ड',
    'admin.userManagement': 'वापरकर्ता व्यवस्थापन',
    'admin.orderManagement': 'ऑर्डर व्यवस्थापन',
    'admin.productManagement': 'उत्पादन व्यवस्थापन',
    
    // Common
    'common.all': 'सर्व',
    'common.kitchen': 'स्वयंपाकघर',
    'common.bathroom': 'स्नानगृह',
    'common.glassCare': 'काचेची काळजी',
    'common.floorCare': 'मजल्याची काळजी',
    'common.sanitizers': 'सॅनिटायझर',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};