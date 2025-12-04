import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BookOpen, Code, Cpu, Rocket, Clock, ChevronRight, Play, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Arduino Sensors",
    description: "Learn the basics of connecting and reading data from common sensors using Arduino.",
    duration: "15 min",
    level: "Beginner",
    category: "Arduino",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Raspberry Pi Temperature Monitoring",
    description: "Build a complete temperature monitoring system with data logging and alerts.",
    duration: "30 min",
    level: "Intermediate",
    category: "Raspberry Pi",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "ESP32 WiFi Sensor Network",
    description: "Create a wireless sensor network that sends data to the cloud.",
    duration: "45 min",
    level: "Advanced",
    category: "ESP32",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Motion Detection with PIR Sensors",
    description: "Implement motion detection for security and automation projects.",
    duration: "20 min",
    level: "Beginner",
    category: "Sensors",
    image: "/placeholder.svg",
  },
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides for all sensors",
    link: "/learn/docs",
    color: "text-primary",
  },
  {
    icon: Code,
    title: "Code Library",
    description: "Ready-to-use code snippets",
    link: "/learn/code",
    color: "text-secondary",
  },
  {
    icon: Cpu,
    title: "Hardware Specs",
    description: "Datasheets and pinout diagrams",
    link: "/learn/hardware",
    color: "text-accent",
  },
  {
    icon: Rocket,
    title: "Project Ideas",
    description: "Inspiration for your next build",
    link: "/learn/projects",
    color: "text-primary",
  },
];

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl font-bold mb-4"
            >
              Learning <span className="text-primary">Hub</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Master sensor technology with our comprehensive tutorials, 
              code examples, and hands-on project guides.
            </motion.p>
          </div>

          {/* Quick Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {resources.map((resource, index) => (
              <Link
                key={resource.title}
                to={resource.link}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
              >
                <resource.icon className={`w-8 h-8 ${resource.color} mb-4`} />
                <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </Link>
            ))}
          </motion.div>

          {/* Featured Tutorials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Featured <span className="text-primary">Tutorials</span>
              </h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={`/learn/tutorials/${tutorial.id}`}
                    className="group flex flex-col md:flex-row gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                      <Play className="w-10 h-10 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {tutorial.category}
                        </span>
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          {tutorial.level}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {tutorial.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-card border border-border rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block text-sm font-medium text-secondary uppercase tracking-widest mb-4">
                  Code Examples
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Ready-to-Use <span className="text-secondary">Code</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Copy and paste working code examples for Arduino, Raspberry Pi, 
                  ESP32, and more. Each example is tested and documented.
                </p>
                <Link to="/learn/code">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Browse Code Library <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="bg-muted rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-muted-foreground">temperature_sensor.ino</span>
                </div>
                <pre className="text-muted-foreground">
                  <code>
                    <span className="text-accent">#include</span> <span className="text-secondary">&lt;DHT.h&gt;</span>{"\n\n"}
                    <span className="text-accent">#define</span> DHTPIN <span className="text-primary">4</span>{"\n"}
                    <span className="text-accent">#define</span> DHTTYPE <span className="text-primary">DHT22</span>{"\n\n"}
                    <span className="text-primary">DHT</span> dht(DHTPIN, DHTTYPE);{"\n\n"}
                    <span className="text-accent">void</span> <span className="text-secondary">setup</span>() {"{\n"}
                    {"  "}Serial.<span className="text-primary">begin</span>(<span className="text-primary">9600</span>);{"\n"}
                    {"  "}dht.<span className="text-primary">begin</span>();{"\n"}
                    {"}\n\n"}
                    <span className="text-accent">void</span> <span className="text-secondary">loop</span>() {"{\n"}
                    {"  "}<span className="text-accent">float</span> temp = dht.<span className="text-primary">readTemperature</span>();{"\n"}
                    {"  "}Serial.<span className="text-primary">println</span>(temp);{"\n"}
                    {"  "}<span className="text-primary">delay</span>(<span className="text-primary">2000</span>);{"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
