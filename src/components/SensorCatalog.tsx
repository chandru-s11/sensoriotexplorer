import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Thermometer, 
  Gauge, 
  Move, 
  Sun, 
  Droplets, 
  Radio,
  ArrowRight
} from "lucide-react";

const sensors = [
  {
    id: "temperature",
    name: "Temperature",
    description: "Measure thermal energy with precision sensors for climate monitoring and industrial applications.",
    icon: Thermometer,
    color: "from-red-500 to-orange-500",
    glowColor: "rgba(239, 68, 68, 0.3)",
  },
  {
    id: "pressure",
    name: "Pressure",
    description: "Detect force per unit area for weather systems, altitude measurement, and fluid dynamics.",
    icon: Gauge,
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "motion",
    name: "Motion",
    description: "Capture movement and acceleration with gyroscopes and accelerometers for navigation.",
    icon: Move,
    color: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.3)",
  },
  {
    id: "light",
    name: "Light",
    description: "Measure illumination levels and detect ambient light for smart lighting systems.",
    icon: Sun,
    color: "from-yellow-500 to-amber-500",
    glowColor: "rgba(234, 179, 8, 0.3)",
  },
  {
    id: "humidity",
    name: "Humidity",
    description: "Monitor moisture levels in the air for HVAC systems and agricultural applications.",
    icon: Droplets,
    color: "from-cyan-500 to-teal-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
  },
  {
    id: "proximity",
    name: "Proximity",
    description: "Detect nearby objects without physical contact using infrared or ultrasonic waves.",
    icon: Radio,
    color: "from-purple-500 to-violet-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SensorCatalog = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4"
          >
            Sensor Catalog
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            Explore Our <span className="text-primary">Sensor</span> Library
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover a comprehensive collection of sensors with interactive demos, 
            code examples, and real-world applications.
          </motion.p>
        </div>

        {/* Sensor Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sensors.map((sensor) => (
            <motion.div key={sensor.id} variants={cardVariants}>
              <Link
                to={`/sensors/${sensor.id}`}
                className="group block h-full"
              >
                <div 
                  className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 40px -20px ${sensor.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                  }}
                >
                  {/* Gradient Background */}
                  <div 
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sensor.color} opacity-10 blur-3xl rounded-full transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
                  />
                  
                  {/* Icon */}
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${sensor.color} mb-5`}>
                    <sensor.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {sensor.name} Sensor
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {sensor.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/sensors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 border border-border hover:border-primary/30 rounded-full font-medium transition-all duration-300 group"
          >
            View All Sensors
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
