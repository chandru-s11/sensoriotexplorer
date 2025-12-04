import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Thermometer, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface DataPoint {
  time: number;
  temperature: number;
}

export const SimulationDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [ambientTemp, setAmbientTemp] = useState([25]);
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentTemp, setCurrentTemp] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setData((prev) => {
          const newTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0;
          // Simulate temperature with some noise and gradual change toward ambient
          const noise = (Math.random() - 0.5) * 2;
          const newTemp = currentTemp + (ambientTemp[0] - currentTemp) * 0.1 + noise;
          setCurrentTemp(newTemp);
          
          const newData = [...prev, { time: newTime, temperature: Number(newTemp.toFixed(1)) }];
          // Keep only last 30 data points
          return newData.slice(-30);
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isRunning, ambientTemp, currentTemp]);

  const handleReset = () => {
    setIsRunning(false);
    setData([]);
    setCurrentTemp(ambientTemp[0]);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 15) return "text-blue-400";
    if (temp < 25) return "text-cyan-400";
    if (temp < 35) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-secondary uppercase tracking-widest mb-4"
          >
            Interactive Demo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            Try Our <span className="text-secondary">Live</span> Simulation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Experience how sensors work in real-time. Adjust the ambient temperature 
            and watch the sensor respond dynamically.
          </motion.p>
        </div>

        {/* Simulation Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                Temperature Sensor
              </h3>
              
              {/* Current Reading */}
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <span className="text-sm text-muted-foreground block mb-1">Current Reading</span>
                <span className={`font-display text-4xl font-bold ${getTemperatureColor(currentTemp)}`}>
                  {currentTemp.toFixed(1)}°C
                </span>
              </div>

              {/* Ambient Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ambient Temp</span>
                  <span className="text-sm font-medium text-foreground">{ambientTemp[0]}°C</span>
                </div>
                <Slider
                  value={ambientTemp}
                  onValueChange={setAmbientTemp}
                  min={-10}
                  max={50}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-10°C</span>
                  <span>50°C</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" /> Start
                    </>
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
            <div className="md:col-span-2">
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
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
                      domain={[-10, 50]}
                      stroke="hsl(195 30% 60%)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}°`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222 47% 8%)",
                        border: "1px solid hsl(195 50% 20%)",
                        borderRadius: "8px",
                        color: "hsl(195 100% 95%)",
                      }}
                      formatter={(value: number) => [`${value}°C`, "Temperature"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="hsl(195 100% 50%)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "hsl(195 100% 50%)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {data.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Press Start to begin simulation</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
