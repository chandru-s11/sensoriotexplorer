import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Code, Cpu, Rocket, ArrowRight } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Step-by-Step Tutorials",
    description: "Learn sensor integration with easy-to-follow guides for Arduino, Raspberry Pi, and more.",
    link: "/learn/tutorials",
  },
  {
    icon: Code,
    title: "Code Examples",
    description: "Ready-to-use code snippets in Python, C++, and JavaScript for quick prototyping.",
    link: "/learn/code",
  },
  {
    icon: Cpu,
    title: "Hardware Guides",
    description: "Understand wiring diagrams, pinouts, and hardware specifications for each sensor.",
    link: "/learn/hardware",
  },
  {
    icon: Rocket,
    title: "Project Ideas",
    description: "Get inspired with real-world IoT project ideas from smart home to industrial applications.",
    link: "/learn/projects",
  },
];

export const LearningHub = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Learning Hub
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Master <span className="text-primary">Sensor</span> Technology
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether you're a beginner or an experienced maker, our comprehensive 
              learning resources will help you understand, integrate, and innovate 
              with sensor technology.
            </p>

            {/* Code Preview */}
            <div className="bg-muted rounded-xl p-4 font-mono text-sm overflow-x-auto border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-muted-foreground">
                <code>
                  <span className="text-accent">import</span>{" "}
                  <span className="text-primary">{"{ DHT22 }"}</span>{" "}
                  <span className="text-accent">from</span>{" "}
                  <span className="text-secondary">'sensors'</span>;{"\n\n"}
                  <span className="text-muted-foreground/60">// Initialize temperature sensor</span>{"\n"}
                  <span className="text-accent">const</span>{" "}
                  <span className="text-foreground">sensor</span> ={" "}
                  <span className="text-accent">new</span>{" "}
                  <span className="text-primary">DHT22</span>
                  <span className="text-muted-foreground">(</span>
                  <span className="text-secondary">4</span>
                  <span className="text-muted-foreground">)</span>;{"\n\n"}
                  <span className="text-muted-foreground/60">// Read temperature and humidity</span>{"\n"}
                  <span className="text-accent">const</span>{" "}
                  <span className="text-foreground">data</span> ={" "}
                  <span className="text-accent">await</span>{" "}
                  <span className="text-foreground">sensor</span>.
                  <span className="text-primary">read</span>();{"\n"}
                  <span className="text-foreground">console</span>.
                  <span className="text-primary">log</span>(
                  <span className="text-secondary">`Temp: </span>
                  <span className="text-accent">${"{"}data.temp{"}"}</span>
                  <span className="text-secondary">°C`</span>);
                </code>
              </pre>
            </div>

            <Link
              to="/learn"
              className="inline-flex items-center gap-2 mt-8 text-primary font-medium hover:gap-3 transition-all"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={feature.link}
                  className="group block h-full p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
