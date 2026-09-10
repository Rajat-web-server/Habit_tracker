import { Card } from "../ui/card";

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

export const WeeklyConsistencyChart = ({ trend }) => {
  return (
    <Card className="border border-white/10 bg-[#111313] p-4 text-white">

      <h3 className="mb-3 text-sm font-semibold text-white">
        Combined weekly consistency
      </h3>

      <div className="h-72 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={trend}
            margin={{
              top: 8,
              right: 12,
              left: -12,
              bottom: 0,
            }}
          >

            <defs>
              <linearGradient
                id="greenFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#444"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#d1d5db",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "#d1d5db",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Completed",
              ]}
              contentStyle={{
                backgroundColor: "#111313",
                border: "1px solid #444",
                borderRadius: 8,
                color: "#fff",
                fontSize: 12,
              }}
            />

            <Area
              type="monotone"
              dataKey="completion"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#greenFill)"
              dot={{
                r: 4,
                fill: "#22c55e",
                stroke: "#22c55e",
              }}
              activeDot={{
                r: 6,
                fill: "#22c55e",
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
};