import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BiodiversityData {
  year: string;
  species: number;
  conservation: number;
}

interface BiodiversityChartProps {
  data: BiodiversityData[];
}

const BiodiversityChart: React.FC<BiodiversityChartProps> = ({ data }) => {
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
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="species"
          stackId="1"
          stroke="#2ecc71"
          fill="#82ca9d"
          name="Species Count"
        />
        <Area
          type="monotone"
          dataKey="conservation"
          stackId="1"
          stroke="#3498db"
          fill="#8884d8"
          name="Conservation Area"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BiodiversityChart;

