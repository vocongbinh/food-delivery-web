"use client"
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 },
    { name: 'Jul', uv: 3490, pv: 4300 },
    { name: 'Aug', uv: 4000, pv: 2400 },
    { name: 'Sep', uv: 3000, pv: 1398 },
    { name: 'Oct', uv: 2000, pv: 9800 },
    { name: 'Nov', uv: 2780, pv: 3908 },
    { name: 'Dec', uv: 1890, pv: 4800 },
];

export default function FulfilmentChart({ className }: { className?: string }) {
    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    );
}