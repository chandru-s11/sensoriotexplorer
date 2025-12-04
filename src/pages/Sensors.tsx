import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Thermometer, 
  Gauge, 
  Move, 
  Sun, 
  Droplets, 
  Radio,
  Mic,
  Eye,
  Wind,
  Zap,
  MapPin,
  Heart,
  ArrowRight,
  Search
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const allSensors = [
  {
    id: "temperature",
    name: "Temperature",
    description: "Measure thermal energy with precision sensors for climate monitoring and industrial applications.",
    icon: Thermometer,
    category: "Environmental",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "pressure",
    name: "Pressure",
    description: "Detect force per unit area for weather systems, altitude measurement, and fluid dynamics.",
    icon: Gauge,
    category: "Environmental",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "motion",
    name: "Motion",
    description: "Capture movement and acceleration with gyroscopes and accelerometers for navigation.",
    icon: Move,
    category: "Motion",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "light",
    name: "Light",
    description: "Measure illumination levels and detect ambient light for smart lighting systems.",
    icon: Sun,
    category: "Environmental",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "humidity",
    name: "Humidity",
    description: "Monitor moisture levels in the air for HVAC systems and agricultural applications.",
    icon: Droplets,
    category: "Environmental",
    color: "from-cyan-500 to-teal-500",
  },
  {
    id: "proximity",
    name: "Proximity",
    description: "Detect nearby objects without physical contact using infrared or ultrasonic waves.",
    icon: Radio,
    category: "Distance",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "sound",
    name: "Sound",
    description: "Capture audio signals and measure decibel levels for voice control and noise monitoring.",
    icon: Mic,
    category: "Audio",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "infrared",
    name: "Infrared",
    description: "Detect heat signatures and enable night vision capabilities for security systems.",
    icon: Eye,
    category: "Vision",
    color: "from-red-600 to-red-400",
  },
  {
    id: "gas",
    name: "Gas",
    description: "Detect various gases in the environment for air quality and safety monitoring.",
    icon: Wind,
    category: "Environmental",
    color: "from-gray-500 to-slate-500",
  },
  {
    id: "current",
    name: "Current",
    description: "Measure electrical current flow for power monitoring and energy management.",
    icon: Zap,
    category: "Electrical",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: "gps",
    name: "GPS",
    description: "Track geographical position using satellite signals for location-based services.",
    icon: MapPin,
    category: "Position",
    color: "from-blue-600 to-indigo-500",
  },
  {
    id: "heartrate",
    name: "Heart Rate",
    description: "Monitor pulse and heart rate for health tracking and fitness applications.",
    icon: Heart,
    category: "Biometric",
    color: "from-red-500 to-pink-500",
  },
];

const categories = ["All", "Environmental", "Motion", "Distance", "Audio", "Vision", "Electrical", "Position", "Biometric"];

const Sensors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSensors = allSensors.filter((sensor) => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || sensor.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl font-bold mb-4"
            >
              Sensor <span className="text-primary">Catalog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Explore our comprehensive library of sensors with interactive demos, 
              code examples, and real-world applications.
            </motion.p>
          </div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sensors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sensor Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSensors.map((sensor, index) => (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/sensors/${sensor.id}`}
                  className="group block h-full p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${sensor.color} mb-4`}>
                    <sensor.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <span className="inline-block px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full mb-3">
                    {sensor.category}
                  </span>
                  
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {sensor.name} Sensor
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {sensor.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredSensors.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No sensors found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sensors;
