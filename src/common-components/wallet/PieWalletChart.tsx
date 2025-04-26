import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const sampleData = [
    { name: 'BTC', value: 40000 },
    { name: 'ETH', value: 15000 },
    { name: 'XRP', value: 5000  },
    { name: 'Others', value: 10000 },
];

const COLORS = ['#f7931a', '#627eea', '#23292f', '#888888'];

const PieWalletChart: React.FC<{ data?: typeof sampleData }> = ({ data = sampleData }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label={({ percent }) => `${(percent! * 100).toFixed(0)}%`}
            >
                {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
        </PieChart>
    </ResponsiveContainer>
);

export default PieWalletChart;
