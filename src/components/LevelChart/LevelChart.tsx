"use client";
import { useGetCategoryStatistic } from "@/react-query/statistics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#4F46E5", "#F97316", "#F43F5E", "#EC4899"];

export const LevelChart: React.FC<{ restaurantId: number }> = ({
  restaurantId,
}) => {
  const { data: pieData } = useGetCategoryStatistic(restaurantId);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={340}>
        {pieData && (
          <Pie
            data={pieData}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                className="text-xs "
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        )}
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
