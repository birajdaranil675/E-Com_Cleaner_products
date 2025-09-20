import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Shield, Leaf, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every product we create is designed with our customers' needs and satisfaction at the forefront."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "We're committed to protecting the environment with biodegradable, sustainable cleaning solutions."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All our products undergo rigorous testing to ensure they're safe for your family and home."
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "We never compromise on quality, delivering exceptional cleaning performance every time."
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Customers" },
    { number: "25+", label: "Premium Products" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About HealthyShine
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Since 2009, we've been dedicated to creating premium cleaning products that make your home sparkle while protecting what matters most - your family and the environment.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    HealthyShine was born from a simple yet powerful vision: to create cleaning products that are both incredibly effective and completely safe for families. Our founder, Sarah Martinez, started this journey in her own kitchen, frustrated by harsh chemicals that cleaned well but left behind concerning residues.
                  </p>
                  <p>
                    After years of research and development, working with chemists and environmental scientists, we developed our first eco-friendly formula that outperformed traditional cleaners. Word spread quickly, and what started as a small local business has grown into a trusted national brand.
                  </p>
                  <p>
                    Today, HealthyShine continues to innovate, constantly improving our formulas and developing new products that meet the evolving needs of modern families. We're proud to be part of your daily routine, helping you maintain a clean, healthy, and beautiful home.
                  </p>
                </div>
              </div>
              <div className="animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop"
                  alt="HealthyShine team"
                  className="rounded-lg shadow-medium w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do, from product development to customer service
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground">
                Numbers that showcase our commitment to excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <Award className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                "To revolutionize the cleaning industry by creating products that are powerful enough to tackle the toughest messes, gentle enough for everyday use, and responsible enough to protect our planet for future generations."
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">- The HealthyShine Team</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;