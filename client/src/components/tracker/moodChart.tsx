// File: client/src/components/tracker/moodChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const MoodChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);