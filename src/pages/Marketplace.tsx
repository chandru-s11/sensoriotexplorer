import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShoppingBag, Shield, Truck, Star, Bell, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const kits = [
  {
    id: 1,
    name: "IoT Starter Kit",
    description: "Perfect for beginners with 10 essential sensors including temperature, humidity, motion, and light sensors.",
    price: "$49.99",
    originalPrice: "$79.99",
    tag: "Popular",
    features: ["10 Sensors", "Arduino Compatible", "Tutorial Included", "Free Shipping"],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Pro Maker Bundle",
    description: "Advanced sensor collection for serious makers. Includes precision sensors and wireless modules.",
    price: "$149.99",
    originalPrice: "$199.99",
    tag: "Best Value",
    features: ["25 Sensors", "ESP32 Included", "Cloud Integration", "Priority Support"],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Industrial Pack",
    description: "Enterprise-grade sensors for professional applications. Includes industrial-rated components.",
    price: "$299.99",
    originalPrice: "$399.99",
    tag: "Professional",
    features: ["40+ Sensors", "Industrial Grade", "Extended Warranty", "Documentation"],
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 4,
    name: "Environmental Kit",
    description: "Complete weather station sensors for environmental monitoring and climate research.",
    price: "$89.99",
    originalPrice: "$119.99",
    tag: "New",
    features: ["12 Sensors", "Weather Proof", "Data Logger", "Solar Compatible"],
    rating: 4.7,
    reviews: 56,
  },
];

const Marketplace = () => {
  const [email, setEmail] = useState("");

  const handleNotify = () => {
    if (email) {
      toast.success("You'll be notified when the marketplace launches!");
      setEmail("");
    } else {
      toast.error("Please enter your email address");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full mb-6"
            >
              <ShoppingBag className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Coming Soon</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold mb-4"
            >
              Sensor <span className="text-secondary">Marketplace</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8"
            >
              Get hands-on with curated sensor kits and IoT starter packs. 
              Everything you need to bring your projects to life.
            </motion.p>

            {/* Notify Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto flex gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border focus:border-secondary"
              />
              <Button
                onClick={handleNotify}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0"
              >
                <Bell className="w-4 h-4 mr-2" /> Notify Me
              </Button>
            </motion.div>
          </div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {kits.map((kit, index) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative p-6 bg-card border border-border rounded-2xl hover:border-secondary/50 transition-all duration-300"
              >
                {/* Tag */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                  {kit.tag}
                </span>

                {/* Image Placeholder */}
                <div className="w-full h-40 bg-muted rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{kit.rating}</span>
                  <span className="text-xs text-muted-foreground">({kit.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                  {kit.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {kit.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {kit.features.slice(0, 2).map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-foreground">
                      {kit.price}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      {kit.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 border-border hover:border-secondary/50 hover:bg-secondary/10"
                  disabled
                >
                  Coming Soon
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 py-8 border-t border-border"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Secure Checkout</p>
                <p className="text-sm">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Fast Shipping</p>
                <p className="text-sm">Worldwide delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Star className="w-6 h-6 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Quality Guaranteed</p>
                <p className="text-sm">30-day money back</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
