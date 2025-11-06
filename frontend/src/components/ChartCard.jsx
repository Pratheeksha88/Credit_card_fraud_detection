import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ChartCard({ title }) {
  const data = [
    { name: 'A', value: 1 },
    { name: 'B', value: 2 }
  ]

  return (
    <div className="bg-white/5 p-4 rounded-2xl shadow-lg">
      <h3 className="text-lg mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}  