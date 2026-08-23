import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface HorizontalBarChartProps {
  title: string;
  data: { name: string; value: number }[];
  color?: string;
}

export default function HorizontalBarChart({
  title,
  data,
  color = "#0B5D48",
}: HorizontalBarChartProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-graphite mb-3">{title}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: "1px solid #E5E7EB",
                fontSize: 12,
                fontFamily: "DM Sans, sans-serif",
              }}
              cursor={{ fill: "rgba(11, 93, 72, 0.05)" }}
            />
            <Bar dataKey="value" fill={color} radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
