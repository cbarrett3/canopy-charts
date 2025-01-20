import { TreePine, Bird } from "lucide-react"
import TreeGrowthChart from "../components/TreeGrowthChart"
import BiodiversityChart from "../components/BiodiversityChart"

export const chartComponents = [
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