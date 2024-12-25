"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        service: 4000,
        volume: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        service: 3000,
        volume: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        service: 2000,
        volume: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        service: 2780,
        volume: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        service: 1890,
        volume: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        service: 2390,
        volume: 3800,
        amt: 2500,
    },
];
export default function LevelChart() {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={100}
                height={300}
                barSize={20}
                data={data}
                margin={{
                    top: 20,
                    right: 10,
                    left: 10,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" stackId="a" fill="#A9DFD8" />
                <Bar dataKey="service" stackId="a" fill="#2B2B36" />
            </BarChart>
        </ResponsiveContainer>
    )
}
