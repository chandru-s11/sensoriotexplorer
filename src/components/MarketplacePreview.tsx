import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Shield, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const kits = [
  {
    name: "IoT Starter Kit",
    description: "Perfect for beginners with 10 essential sensors",
    price: "$49.99",
    tag: "Popular",
  },
  {
    name: "Pro Maker Bundle",
    description: "Advanced sensors for serious makers",
    price: "$149.99",
    tag: "Best Value",
  },
  {
    name: "Industrial Pack",
    description: "Enterprise-grade sensor collection",
    price: "$299.99",
    tag: "Professional",
  },
];

export const MarketplacePreview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full mb-6"
          >
            <ShoppingBag className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Coming Soon</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            Sensor <span className="text-secondary">Marketplace</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Get hands-on with curated sensor kits and IoT starter packs. 
            Everything you need to bring your projects to life.
          </motion.p>
        </div>

        {/* Kits Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {kits.map((kit, index) => (
            <div
              key={kit.name}
              className="relative p-6 bg-card border border-border rounded-2xl hover:border-secondary/50 transition-all duration-300 group"
            >
              {/* Tag */}
              <span className="absolute top-4 right-4 px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                {kit.tag}
              </span>
              
              {/* Placeholder Image */}
              <div className="w-full h-40 bg-muted rounded-xl mb-4 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
              </div>
              
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                {kit.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {kit.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-foreground">
                  {kit.price}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="border-border text-muted-foreground"
                >
                  Notify Me
                </Button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-secondary" />
            <span>Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-secondary" />
            <span>Quality Guaranteed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
