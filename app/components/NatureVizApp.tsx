'use client'
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Switch } from "../components/ui/switch"
import { Slider } from "../components/ui/slider"
import { Label } from "../components/ui/label"
import { TreePine, Bird, Code, Copy, Check, Leaf } from "lucide-react"
import TreeGrowthChart from "./TreeGrowthChart"
import BiodiversityChart from "./BiodiversityChart"

const NatureVizApp = () => {
   const [darkMode, setDarkMode] = useState(false)

   useEffect(() => {
      const isDarkMode = localStorage.getItem("darkMode") === "true"
      setDarkMode(isDarkMode)
      document.documentElement.classList.toggle("dark", isDarkMode)
   }, [])

   const toggleDarkMode = () => {
      const newDarkMode = !darkMode
      setDarkMode(newDarkMode)
      localStorage.setItem("darkMode", newDarkMode.toString())
      document.documentElement.classList.toggle("dark", newDarkMode)
   }

   const chartComponents = [
      {
         id: "growth",
         title: "Tree Growth Analysis",
         subtitle:
            "Track tree height and rainfall correlation across months with interactive visualizations that adapt to your data.",
         icon: <TreePine className="h-6 w-6" />,
         component: TreeGrowthChart,
         defaultData: [
            { month: "Jan", height: 120, rainfall: 50 },
            { month: "Feb", height: 125, rainfall: 55 },
            { month: "Mar", height: 132, rainfall: 65 },
            { month: "Apr", height: 140, rainfall: 70 },
            { month: "May", height: 150, rainfall: 80 },
            { month: "Jun", height: 165, rainfall: 85 },
         ],
         customizationOptions: [
            { name: "showLegend", label: "Show Legend", default: true },
            { name: "showTooltip", label: "Show Tooltip", default: true },
            { name: "showGrid", label: "Show Grid", default: true },
            { name: "animationDuration", label: "Animation Duration (ms)", default: 300, type: "number" },
            {
               name: "curveType",
               label: "Curve Type",
               default: "linear",
               type: "select",
               options: ["linear", "natural", "step", "monotone"],
            },
         ],
         usageExample: `
const data = [
  { month: 'Jan', height: 120, rainfall: 50 },
  { month: 'Feb', height: 125, rainfall: 55 },
  { month: 'Mar', height: 132, rainfall: 65 },
  { month: 'Apr', height: 140, rainfall: 70 },
  { month: 'May', height: 150, rainfall: 80 },
  { month: 'Jun', height: 165, rainfall: 85 }
];

<TreeGrowthChart 
  data={data}
  showLegend={true}
  showTooltip={true}
  showGrid={true}
  animationDuration={300}
  curveType="natural"
/>
      `,
         implementationCode: `
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TreeGrowthChart = ({ 
  data, 
  showLegend = true, 
  showTooltip = true, 
  showGrid = true, 
  animationDuration = 300,
  curveType = 'linear'
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        aria-label="Tree Growth Chart"
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey="month"
          tick={{ fill: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis
          yAxisId="left"
          tick={{ fill: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        )}
        {showLegend && <Legend />}
        <Line
          yAxisId="left"
          type={curveType}
          dataKey="height"
          stroke="#2ecc71"
          name="Height (cm)"
          activeDot={{ r: 8 }}
          animationDuration={animationDuration}
        />
        <Line
          yAxisId="right"
          type={curveType}
          dataKey="rainfall"
          stroke="#3498db"
          name="Rainfall (mm)"
          activeDot={{ r: 8 }}
          animationDuration={animationDuration}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TreeGrowthChart;
      `,
      },
      {
         id: "biodiversity",
         title: "Biodiversity Trends",
         subtitle:
            "Monitor species count and conservation area changes over time with our advanced stacked area visualization.",
         icon: <Bird className="h-6 w-6" />,
         component: BiodiversityChart,
         defaultData: [
            { year: "2018", species: 45, conservation: 20 },
            { year: "2019", species: 42, conservation: 25 },
            { year: "2020", species: 48, conservation: 30 },
            { year: "2021", species: 52, conservation: 35 },
            { year: "2022", species: 55, conservation: 40 },
         ],
         customizationOptions: [
            { name: "showLegend", label: "Show Legend", default: true },
            { name: "showTooltip", label: "Show Tooltip", default: true },
            { name: "stackedView", label: "Stacked View", default: true },
            { name: "animationDuration", label: "Animation Duration (ms)", default: 300, type: "number" },
            { name: "areaOpacity", label: "Area Opacity", default: 0.6, type: "range", min: 0, max: 1, step: 0.1 },
         ],
         usageExample: `
const data = [
  { year: '2018', species: 45, conservation: 20 },
  { year: '2019', species: 42, conservation: 25 },
  { year: '2020', species: 48, conservation: 30 },
  { year: '2021', species: 52, conservation: 35 },
  { year: '2022', species: 55, conservation: 40 }
];

<BiodiversityChart 
  data={data}
  showLegend={true}
  showTooltip={true}
  stackedView={true}
  animationDuration={300}
  areaOpacity={0.6}
/>
      `,
         implementationCode: `
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BiodiversityChart = ({ 
  data, 
  showLegend = true, 
  showTooltip = true, 
  stackedView = true, 
  animationDuration = 300,
  areaOpacity = 0.6
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        aria-label="Biodiversity Trends Chart"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tick={{ fill: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        <YAxis
          tick={{ fill: 'currentColor' }}
          axisLine={{ stroke: 'currentColor' }}
          tickLine={{ stroke: 'currentColor' }}
        />
        {showTooltip && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        )}
        {showLegend && <Legend />}
        <Area
          type="monotone"
          dataKey="species"
          stackId={stackedView ? "1" : undefined}
          stroke="#2ecc71"
          fill="#82ca9d"
          fillOpacity={areaOpacity}
          name="Species Count"
          animationDuration={animationDuration}
        />
        <Area
          type="monotone"
          dataKey="conservation"
          stackId={stackedView ? "1" : undefined}
          stroke="#3498db"
          fill="#8884d8"
          fillOpacity={areaOpacity}
          name="Conservation Area"
          animationDuration={animationDuration}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BiodiversityChart;
      `,
      },
   ]

   const ChartSection: React.FC<{ component: any, index: number }> = ({ component, index }) => {
      const [showCode, setShowCode] = useState(false)
      const [copied, setCopied] = useState(false)
      const [customization, setCustomization] = useState(
         component.customizationOptions.reduce((acc: Record<string, any>, option: { name: string; default: any }) => {
            acc[option.name] = option.default
            return acc
         }, {}),
      )

      const copyCode = async (code: string) => {
         await navigator.clipboard.writeText(code)
         setCopied(true)
         setTimeout(() => setCopied(false), 2000)
      }

      const updateCustomization = (name: string, value: any) => {
         setCustomization((prev: Record<string, any>) => ({ ...prev, [name]: value }))
      }

      return (
         <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
         >
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
               className="space-y-4"
            >
               <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                     {React.cloneElement(component.icon, { className: "text-blue-600 dark:text-blue-400" })}
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{component.title}</h2>
               </div>
               <p className="text-gray-600 dark:text-gray-400 text-lg">{component.subtitle}</p>
               <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setShowCode(!showCode)} className="flex items-center space-x-2">
                     <Code className="h-4 w-4" />
                     <span>{showCode ? "Hide Code" : "View Code"}</span>
                  </Button>
               </div>
               {showCode && (
                  <Card className="mt-4">
                     <CardContent className="p-4">
                        <Tabs defaultValue="usage">
                           <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="usage">Usage Example</TabsTrigger>
                              <TabsTrigger value="customize">Customize</TabsTrigger>
                              <TabsTrigger value="implementation">Implementation</TabsTrigger>
                           </TabsList>
                           <TabsContent value="usage">
                              <div className="relative">
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyCode(component.usageExample)}
                                    className="absolute top-2 right-2"
                                 >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                 </Button>
                                 <pre className="text-sm p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                                    <code>{component.usageExample}</code>
                                 </pre>
                              </div>
                           </TabsContent>
                           <TabsContent value="customize">
                              <div className="space-y-4">
                                 {component.customizationOptions.map((option: { name: string; label: string; type?: string; default: any; min?: number; max?: number; step?: number; options?: string[] }) => (
                                    <div key={option.name} className="flex items-center justify-between">
                                       <Label htmlFor={`${component.id}-${option.name}`} className="text-sm font-medium">
                                          {option.label}
                                       </Label>
                                       {option.type === "number" ? (
                                          <Input
                                             id={`${component.id}-${option.name}`}
                                             type="number"
                                             value={customization[option.name]}
                                             onChange={(e) => updateCustomization(option.name, Number(e.target.value))}
                                             className="w-24 text-right"
                                          />
                                       ) : option.type === "range" ? (
                                          <Slider
                                             id={`${component.id}-${option.name}`}
                                             min={option.min}
                                             max={option.max}
                                             step={option.step}
                                             value={[customization[option.name]]}
                                             onValueChange={(value) => updateCustomization(option.name, value[0])}
                                             className="w-[200px]"
                                          />
                                       ) : option.type === "select" ? (
                                          <select
                                             id={`${component.id}-${option.name}`}
                                             value={customization[option.name]}
                                             onChange={(e) => updateCustomization(option.name, e.target.value)}
                                             className="w-[200px]"
                                          >
                                             {option.options!.map((opt) => (
                                                <option key={opt} value={opt}>
                                                   {opt}
                                                </option>
                                             ))}
                                          </select>
                                       ) : (
                                          <Switch
                                             id={`${component.id}-${option.name}`}
                                             checked={customization[option.name]}
                                             onCheckedChange={(checked) => updateCustomization(option.name, checked)}
                                          />
                                       )}
                                    </div>
                                 ))}
                              </div>
                           </TabsContent>
                           <TabsContent value="implementation">
                              <div className="relative">
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyCode(component.implementationCode)}
                                    className="absolute top-2 right-2"
                                 >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                 </Button>
                                 <pre className="text-sm p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                                    <code>{component.implementationCode}</code>
                                 </pre>
                              </div>
                           </TabsContent>
                        </Tabs>
                     </CardContent>
                  </Card>
               )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
               <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl border border-white/20">
                  <div className="h-[400px]">
                     <component.component data={component.defaultData} {...customization} />
                  </div>
               </Card>
            </motion.div>
         </div>
      )
   }

   return (
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
         <div className="fixed inset-x-0 top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg backdrop-saturate-150 rounded-full shadow-lg border border-white/20 px-6 py-3">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-green-400 rounded-full p-2">
                           <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">
                              EcoViz
                           </h1>
                           <p className="text-xs text-gray-600 dark:text-gray-400">Environmental Data Insights</p>
                        </div>
                     </div>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDarkMode}
                        className="rounded-full"
                        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
                     >
                        {darkMode ? (
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                              />
                           </svg>
                        ) : (
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                              />
                           </svg>
                        )}
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                     Visualize Environmental Data with Ease
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                     EcoViz empowers you to create stunning, interactive charts that bring your environmental data to life.
                     Explore our components below and see how easy it is to integrate them into your projects.
                  </p>
               </div>

               <div className="space-y-24">
                  {chartComponents.map((component, index) => (
                     <ChartSection key={component.id} component={component} index={index} />
                  ))}
               </div>
            </div>

            <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-white/20 mt-16">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div>
                        <h4 className="text-lg font-semibold mb-4">About EcoViz</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                           EcoViz is a powerful tool for creating interactive environmental data visualizations using D3.js and
                           React.
                        </p>
                     </div>
                     <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                           <li>
                              <a
                                 href="#"
                                 className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                 Documentation
                              </a>
                           </li>
                           <li>
                              <a
                                 href="#"
                                 className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                 Examples
                              </a>
                           </li>
                           <li>
                              <a
                                 href="#"
                                 className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                 GitHub
                              </a>
                           </li>
                           <li>
                              <a
                                 href="#"
                                 className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                 API Reference
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div>
                        <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                           Subscribe to our newsletter for updates and tips.
                        </p>
                        <form className="flex space-x-2">
                           <Input
                              type="email"
                              placeholder="Enter your email"
                              className="flex-grow dark:bg-gray-800 border-white/20"
                           />
                           <Button className="bg-gradient-to-r from-blue-600 to-green-400 text-white hover:opacity-90">
                              Subscribe
                           </Button>
                        </form>
                     </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                     <p className="text-center text-gray-600 dark:text-gray-400">© 2024 EcoViz. All rights reserved.</p>
                  </div>
               </div>
            </footer>
         </div>
      </div>
   )
}

export default NatureVizApp

