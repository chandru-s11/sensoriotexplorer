import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Thermometer, Gauge, Sun, Droplets, Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataPoint {
  time: number;
  value: number;
}

const simulations = [
  {
    id: "temperature",
    name: "Temperature",
    icon: Thermometer,
    unit: "°C",
    min: -20,
    max: 60,
    defaultValue: 25,
    color: "#ef4444",
  },
  {
    id: "pressure",
    name: "Pressure",
    icon: Gauge,
    unit: "hPa",
    min: 950,
    max: 1050,
    defaultValue: 1013,
    color: "#3b82f6",
  },
  {
    id: "light",
    name: "Light Intensity",
    icon: Sun,
    unit: "lux",
    min: 0,
    max: 10000,
    defaultValue: 500,
    color: "#eab308",
  },
  {
    id: "humidity",
    name: "Humidity",
    icon: Droplets,
    unit: "%",
    min: 0,
    max: 100,
    defaultValue: 50,
    color: "#06b6d4",
  },
];

const Simulations = () => {
  const [activeSim, setActiveSim] = useState(simulations[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [targetValue, setTargetValue] = useState([simulations[0].defaultValue]);
  const [currentValue, setCurrentValue] = useState(simulations[0].defaultValue);
  const [data, setData] = useState<DataPoint[]>([]);
  const [noiseLevel, setNoiseLevel] = useState([5]);

  useEffect(() => {
    setTargetValue([activeSim.defaultValue]);
    setCurrentValue(activeSim.defaultValue);
    setData([]);
    setIsRunning(false);
  }, [activeSim]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setData((prev) => {
          const newTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0;
          const noise = (Math.random() - 0.5) * noiseLevel[0] * 2;
          const newValue = currentValue + (targetValue[0] - currentValue) * 0.1 + noise;
          const clampedValue = Math.max(activeSim.min, Math.min(activeSim.max, newValue));
          setCurrentValue(clampedValue);
          
          const newData = [...prev, { time: newTime, value: Number(clampedValue.toFixed(1)) }];
          return newData.slice(-50);
        });
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isRunning, targetValue, currentValue, noiseLevel, activeSim]);

  const handleReset = () => {
    setIsRunning(false);
    setData([]);
    setCurrentValue(activeSim.defaultValue);
    setTargetValue([activeSim.defaultValue]);
  };

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
              Virtual <span className="text-secondary">Simulations</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Experience how sensors respond to environmental changes in real-time. 
              Adjust parameters and watch the data unfold.
            </motion.p>
          </div>

          {/* Simulation Tabs */}
          <Tabs defaultValue="temperature" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full bg-muted/50 p-1 rounded-xl mb-8">
              {simulations.map((sim) => (
                <TabsTrigger
                  key={sim.id}
                  value={sim.id}
                  onClick={() => setActiveSim(sim)}
                  className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground rounded-lg py-3"
                >
                  <sim.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{sim.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {simulations.map((sim) => (
              <TabsContent key={sim.id} value={sim.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Controls Panel */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${sim.color}20` }}
                        >
                          <sim.icon className="w-5 h-5" style={{ color: sim.color }} />
                        </div>
                        <h3 className="font-display text-lg font-semibold">{sim.name}</h3>
                      </div>

                      {/* Current Value Display */}
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <span className="text-sm text-muted-foreground block mb-1">Current Reading</span>
                        <span 
                          className="font-display text-4xl font-bold"
                          style={{ color: sim.color }}
                        >
                          {currentValue.toFixed(1)}{sim.unit}
                        </span>
                      </div>

                      {/* Target Control */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Target Value</span>
                          <span className="text-sm font-medium">{targetValue[0]}{sim.unit}</span>
                        </div>
                        <Slider
                          value={targetValue}
                          onValueChange={setTargetValue}
                          min={sim.min}
                          max={sim.max}
                          step={1}
                          className="[&_[role=slider]]:border-2"
                          style={{ 
                            ["--slider-color" as string]: sim.color 
                          }}
                        />
                      </div>

                      {/* Noise Control */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Settings className="w-3 h-3" /> Noise Level
                          </span>
                          <span className="text-sm font-medium">{noiseLevel[0]}%</span>
                        </div>
                        <Slider
                          value={noiseLevel}
                          onValueChange={setNoiseLevel}
                          min={0}
                          max={20}
                          step={1}
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsRunning(!isRunning)}
                          className="flex-1"
                          style={{ 
                            backgroundColor: isRunning ? "hsl(var(--muted))" : sim.color,
                            color: isRunning ? "hsl(var(--foreground))" : "white"
                          }}
                        >
                          {isRunning ? (
                            <><Pause className="w-4 h-4 mr-2" /> Pause</>
                          ) : (
                            <><Play className="w-4 h-4 mr-2" /> Start</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="border-border hover:border-primary/50"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-3">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <defs>
                              <linearGradient id={`gradient-${sim.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={sim.color} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={sim.color} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid 
                              strokeDasharray="3 3" 
                              stroke="hsl(195 50% 20% / 0.5)" 
                              vertical={false}
                            />
                            <XAxis 
                              dataKey="time" 
                              stroke="hsl(195 30% 60%)"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis 
                              domain={[sim.min, sim.max]}
                              stroke="hsl(195 30% 60%)"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(222 47% 8%)",
                                border: "1px solid hsl(195 50% 20%)",
                                borderRadius: "8px",
                                color: "hsl(195 100% 95%)",
                              }}
                              formatter={(value: number) => [`${value}${sim.unit}`, sim.name]}
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={sim.color}
                              strokeWidth={2}
                              fill={`url(#gradient-${sim.id})`}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {data.length === 0 && (
                        <div className="flex items-center justify-center h-80 absolute inset-0">
                          <p className="text-muted-foreground">Press Start to begin simulation</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulations;
