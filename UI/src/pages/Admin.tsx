import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Package, ShoppingCart, TrendingUp, Eye, Settings } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

const Admin = () => {
  const { t } = useLanguage();
  const adminTiles = [
    {
      title: "User Management",
      description: "Manage customer accounts, view user activity, and handle support requests",
      icon: Users,
      stats: "1,247 Active Users",
      action: "Manage Users",
      color: "bg-gradient-primary"
    },
    {
      title: "Product Management",
      description: "Add, edit, and organize your product catalog and inventory",
      icon: Package,
      stats: "25 Products",
      action: "Manage Products",
      color: "bg-gradient-secondary"
    },
    {
      title: "Order Management",
      description: "Process orders, track shipments, and manage customer transactions",
      icon: ShoppingCart,
      stats: "184 Pending Orders",
      action: "Manage Orders",
      color: "bg-gradient-shine"
    }
  ];

  const quickStats = [
    { label: "Total Revenue", value: "$45,678", change: "+12.5%", icon: TrendingUp },
    { label: "Monthly Orders", value: "892", change: "+8.2%", icon: ShoppingCart },
    { label: "Active Users", value: "1,247", change: "+15.3%", icon: Users },
    { label: "Products", value: "25", change: "+2", icon: Package }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Header */}
        <section className="py-12 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your HealthyShine business operations
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {quickStats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-secondary text-sm font-medium">{stat.change}</p>
                      </div>
                      <div className="p-3 bg-primary-soft rounded-lg">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Admin Tiles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Management Center
              </h2>
              <p className="text-lg text-muted-foreground">
                Click on any tile to access the management interface
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {adminTiles.map((tile, index) => (
                <Card
                  key={tile.title}
                  className="group border-0 shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="text-center relative">
                    <div className={`w-20 h-20 mx-auto mb-4 ${tile.color} rounded-full flex items-center justify-center group-hover:animate-glow`}>
                      <tile.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {tile.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-center">
                    <p className="text-muted-foreground mb-4">
                      {tile.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-2xl font-bold text-primary">{tile.stats}</p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-transform"
                      size="lg"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {tile.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Recent Activity
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "#12847", customer: "Sarah Johnson", amount: "$67.98", status: "Processing" },
                      { id: "#12846", customer: "Michael Chen", amount: "$43.50", status: "Shipped" },
                      { id: "#12845", customer: "Emma Rodriguez", amount: "$25.99", status: "Delivered" }
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{order.amount}</p>
                          <p className="text-sm text-primary">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Ultra Kitchen Degreaser Pro", sales: "234 sold", revenue: "$3,031.66" },
                      { name: "Eco-Friendly Bathroom Cleaner", sales: "189 sold", revenue: "$1,888.11" },
                      { name: "Multi-Surface Sanitizer Spray", sales: "298 sold", revenue: "$3,424.02" }
                    ].map((product) => (
                      <div key={product.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{product.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;