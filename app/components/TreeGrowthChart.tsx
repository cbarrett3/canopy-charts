import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TreeGrowthData {
  month: string;
  height: number;
  rainfall: number;
}

interface TreeGrowthChartProps {
  data: TreeGrowthData[];
}

const TreeGrowthChart: React.FC<TreeGrowthChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        aria-label="Tree Growth Chart"
      >
        <CartesianGrid strokeDasharray="3 3" />
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
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="height"
          stroke="#2ecc71"
          name="Height (cm)"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="rainfall"
          stroke="#3498db"
          name="Rainfall (mm)"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TreeGrowthChart;

