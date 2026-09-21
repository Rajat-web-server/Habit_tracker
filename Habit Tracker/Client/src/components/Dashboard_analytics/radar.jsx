import { Card } from "../ui/card";

import {
  RadarChart,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from "recharts";

export const WeeklyRadarChart = ({ radarData }) => {
  console.log("Radar data:", radarData);

  return (
    <Card className="h-96 border border-white/10 bg-[#111313] p-5 text-white">
      <h3 className="mb-6 text-sm font-semibold text-white">
        Habit consistency — last 7 days
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="82%">
            <PolarGrid
              stroke="#444"
              strokeDasharray="3 3"
            />

            <PolarAngleAxis
              dataKey="habit"
              tick={{
                fill: "#ffffff",
                fontSize: 13,
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Consistency",
              ]}
              contentStyle={{
                backgroundColor: "#111313",
                border: "1px solid #444",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Radar
              name="Consistency"
              dataKey="consistency"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.25}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#22c55e",
                stroke: "#22c55e",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};