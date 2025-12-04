import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Thermometer, 
  Gauge, 
  Move, 
  Sun, 
  Droplets, 
  Radio,
  ArrowLeft,
  Download,
  Code,
  Zap,
  Cpu,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

const sensorsData = {
  temperature: {
    name: "Temperature",
    icon: Thermometer,
    color: "from-red-500 to-orange-500",
    description: "Temperature sensors detect thermal energy and convert it to electrical signals for measurement. They are essential components in climate control, industrial processes, and everyday electronics.",
    principle: "Temperature sensors work by detecting changes in physical properties caused by temperature variations. Common types include thermistors (resistance changes), thermocouples (voltage generation), and semiconductor sensors (current changes).",
    applications: [
      "HVAC systems and climate control",
      "Industrial process monitoring",
      "Food storage and safety",
      "Medical devices and diagnostics",
      "Weather stations",
      "Automotive engine management",
    ],
    specs: {
      range: "-40°C to +125°C",
      accuracy: "±0.5°C",
      response: "< 1 second",
      voltage: "3.3V - 5V",
      interface: "Analog / I2C / SPI",
    },
    code: {
      arduino: `#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println("°C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  delay(2000);
}`,
      python: `import Adafruit_DHT

sensor = Adafruit_DHT.DHT22
pin = 4

while True:
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
    
    if humidity is not None and temperature is not None:
        print(f"Temperature: {temperature:.1f}°C")
        print(f"Humidity: {humidity:.1f}%")
    else:
        print("Failed to read from sensor")
    
    time.sleep(2)`,
    },
  },
  pressure: {
    name: "Pressure",
    icon: Gauge,
    color: "from-blue-500 to-cyan-500",
    description: "Pressure sensors measure the force exerted by gases or liquids per unit area. They are crucial for weather monitoring, altitude detection, and industrial process control.",
    principle: "Pressure sensors use piezoelectric, capacitive, or resistive elements that change their electrical properties when force is applied. This change is proportional to the pressure being measured.",
    applications: [
      "Weather forecasting systems",
      "Altitude measurement in drones",
      "Industrial pneumatic systems",
      "Medical ventilators",
      "Automotive tire pressure monitoring",
      "SCUBA diving equipment",
    ],
    specs: {
      range: "300-1100 hPa",
      accuracy: "±1 hPa",
      response: "< 5ms",
      voltage: "1.8V - 3.6V",
      interface: "I2C / SPI",
    },
    code: {
      arduino: `#include <Wire.h>
#include <Adafruit_BMP280.h>

Adafruit_BMP280 bmp;

void setup() {
  Serial.begin(9600);
  if (!bmp.begin()) {
    Serial.println("BMP280 not found!");
    while (1);
  }
}

void loop() {
  float pressure = bmp.readPressure() / 100.0F;
  float altitude = bmp.readAltitude(1013.25);
  
  Serial.print("Pressure: ");
  Serial.print(pressure);
  Serial.println(" hPa");
  
  Serial.print("Altitude: ");
  Serial.print(altitude);
  Serial.println(" m");
  
  delay(1000);
}`,
      python: `import board
import adafruit_bmp280

i2c = board.I2C()
bmp280 = adafruit_bmp280.Adafruit_BMP280_I2C(i2c)

bmp280.sea_level_pressure = 1013.25

while True:
    print(f"Pressure: {bmp280.pressure:.1f} hPa")
    print(f"Altitude: {bmp280.altitude:.1f} m")
    time.sleep(1)`,
    },
  },
  motion: {
    name: "Motion",
    icon: Move,
    color: "from-green-500 to-emerald-500",
    description: "Motion sensors detect physical movement in their environment. They combine accelerometers and gyroscopes to measure acceleration and angular velocity.",
    principle: "Motion sensors use MEMS (Micro-Electro-Mechanical Systems) technology with tiny suspended structures that move in response to acceleration or rotation, changing capacitance that is measured electronically.",
    applications: [
      "Gaming controllers and VR",
      "Smartphone screen orientation",
      "Drone stabilization",
      "Fitness trackers",
      "Vehicle safety systems",
      "Robotics navigation",
    ],
    specs: {
      range: "±16g / ±2000°/s",
      accuracy: "< 1% FSO",
      response: "1000 Hz",
      voltage: "2.4V - 3.6V",
      interface: "I2C / SPI",
    },
    code: {
      arduino: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  mpu.initialize();
}

void loop() {
  int16_t ax, ay, az;
  int16_t gx, gy, gz;
  
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  
  Serial.print("Accel: ");
  Serial.print(ax); Serial.print(", ");
  Serial.print(ay); Serial.print(", ");
  Serial.println(az);
  
  Serial.print("Gyro: ");
  Serial.print(gx); Serial.print(", ");
  Serial.print(gy); Serial.print(", ");
  Serial.println(gz);
  
  delay(100);
}`,
      python: `import smbus
import time

bus = smbus.SMBus(1)
MPU6050_ADDR = 0x68

bus.write_byte_data(MPU6050_ADDR, 0x6B, 0)

def read_raw_data(addr):
    high = bus.read_byte_data(MPU6050_ADDR, addr)
    low = bus.read_byte_data(MPU6050_ADDR, addr+1)
    value = (high << 8) | low
    if value > 32768:
        value = value - 65536
    return value

while True:
    acc_x = read_raw_data(0x3B)
    acc_y = read_raw_data(0x3D)
    acc_z = read_raw_data(0x3F)
    
    print(f"Accel: {acc_x}, {acc_y}, {acc_z}")
    time.sleep(0.1)`,
    },
  },
  light: {
    name: "Light",
    icon: Sun,
    color: "from-yellow-500 to-amber-500",
    description: "Light sensors detect electromagnetic radiation in the visible spectrum and beyond, measuring illumination levels for various applications.",
    principle: "Light sensors use photodiodes or phototransistors that generate current when photons strike their semiconductor material. The current is proportional to light intensity.",
    applications: [
      "Automatic display brightness",
      "Smart lighting systems",
      "Photography exposure control",
      "Solar tracking systems",
      "Security and motion detection",
      "Agricultural monitoring",
    ],
    specs: {
      range: "1 - 65535 lux",
      accuracy: "±10%",
      response: "< 600ms",
      voltage: "2.4V - 3.6V",
      interface: "I2C",
    },
    code: {
      arduino: `#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  lightMeter.begin();
}

void loop() {
  float lux = lightMeter.readLightLevel();
  
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lux");
  
  delay(1000);
}`,
      python: `import smbus
import time

BH1750_ADDR = 0x23
POWER_ON = 0x01
CONTINUOUS_MODE = 0x10

bus = smbus.SMBus(1)
bus.write_byte(BH1750_ADDR, POWER_ON)
bus.write_byte(BH1750_ADDR, CONTINUOUS_MODE)

while True:
    data = bus.read_i2c_block_data(BH1750_ADDR, CONTINUOUS_MODE, 2)
    lux = (data[0] << 8 | data[1]) / 1.2
    
    print(f"Light: {lux:.1f} lux")
    time.sleep(1)`,
    },
  },
  humidity: {
    name: "Humidity",
    icon: Droplets,
    color: "from-cyan-500 to-teal-500",
    description: "Humidity sensors measure the amount of water vapor present in the air, essential for climate control and environmental monitoring.",
    principle: "Humidity sensors use capacitive or resistive elements that change their electrical properties based on moisture absorption. The change correlates with relative humidity levels.",
    applications: [
      "HVAC climate control",
      "Weather stations",
      "Greenhouse monitoring",
      "Food processing",
      "Museum preservation",
      "Respiratory equipment",
    ],
    specs: {
      range: "0% - 100% RH",
      accuracy: "±2% RH",
      response: "< 8 seconds",
      voltage: "3.3V - 5V",
      interface: "Digital / I2C",
    },
    code: {
      arduino: `#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temp = dht.readTemperature();
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println("°C");
  
  delay(2000);
}`,
      python: `import Adafruit_DHT

sensor = Adafruit_DHT.DHT22
pin = 4

while True:
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
    
    if humidity is not None:
        print(f"Humidity: {humidity:.1f}%")
        print(f"Temperature: {temperature:.1f}°C")
    else:
        print("Failed to read from sensor")
    
    time.sleep(2)`,
    },
  },
  proximity: {
    name: "Proximity",
    icon: Radio,
    color: "from-purple-500 to-violet-500",
    description: "Proximity sensors detect the presence of nearby objects without physical contact, using infrared, ultrasonic, or capacitive technologies.",
    principle: "Proximity sensors emit signals (IR light or ultrasonic waves) and measure the reflection time or intensity to determine object distance and presence.",
    applications: [
      "Touchless faucets and dispensers",
      "Smartphone screen wake",
      "Parking assistance systems",
      "Industrial automation",
      "Robotics collision avoidance",
      "Security systems",
    ],
    specs: {
      range: "2cm - 400cm",
      accuracy: "±3mm",
      response: "< 50ms",
      voltage: "5V",
      interface: "Digital",
    },
    code: {
      arduino: `#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2;
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  delay(100);
}`,
      python: `import RPi.GPIO as GPIO
import time

TRIG = 23
ECHO = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

while True:
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)
    
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()
    
    distance = (pulse_end - pulse_start) * 17150
    print(f"Distance: {distance:.1f} cm")
    
    time.sleep(0.1)`,
    },
  },
};

const SensorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const sensor = sensorsData[id as keyof typeof sensorsData];
  
  if (!sensor) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Sensor Not Found</h1>
          <Link to="/sensors">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/sensors"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${sensor.color} flex items-center justify-center shrink-0`}
            >
              <sensor.icon className="w-16 h-16 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {sensor.name} <span className="text-primary">Sensor</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {sensor.description}
              </p>
            </motion.div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-card">
                Overview
              </TabsTrigger>
              <TabsTrigger value="code" className="rounded-lg data-[state=active]:bg-card">
                Code Examples
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-card">
                Specifications
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Working Principle
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {sensor.principle}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-secondary" />
                    Applications
                  </h3>
                  <ul className="space-y-2">
                    {sensor.applications.map((app, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </TabsContent>

            {/* Code Tab */}
            <TabsContent value="code">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Arduino Code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-sm text-muted-foreground">Arduino</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(sensor.code.arduino, "arduino")}
                    >
                      {copiedCode === "arduino" ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-muted-foreground">{sensor.code.arduino}</code>
                  </pre>
                </motion.div>

                {/* Python Code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-sm text-muted-foreground">Python (Raspberry Pi)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(sensor.code.python, "python")}
                    >
                      {copiedCode === "python" ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-muted-foreground">{sensor.code.python}</code>
                  </pre>
                </motion.div>
              </div>
            </TabsContent>

            {/* Specs Tab */}
            <TabsContent value="specs">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 max-w-2xl"
              >
                <h3 className="font-display text-xl font-semibold mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(sensor.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground capitalize">{key.replace("_", " ")}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Datasheet
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SensorDetail;
