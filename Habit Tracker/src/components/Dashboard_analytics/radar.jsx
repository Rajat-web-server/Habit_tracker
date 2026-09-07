import { Card } from "../ui/card";

import {
  RadarChart,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

export const WeeklyRadarChart = ({ radarData }) => {
  console.log("Radar data:", radarData);
  return (
    <Card className="h-80 bg-[#111313] p-4 text-white">

      <h3 className="mb-3 text-sm font-semibold text-white">
        Habit consistency — last 7 days
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            outerRadius="70%"
          >

            {/* Grid */}
            <PolarGrid stroke="#444" />

            {/* Habit names */}
            <PolarAngleAxis
              dataKey="habit"
              tick={{
                fill: "#ffffff",
                fontSize: 12,
              }}
            />

            {/* 0 - 100 scale */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{
                fill: "#999",
                fontSize: 10,
              }}
            />

            {/* Hover information */}
            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Consistency",
              ]}
              contentStyle={{
                backgroundColor: "#222",
                border: "1px solid #444",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            {/* Actual radar */}
            <Radar
              name="Consistency"
              dataKey="consistency"
              stroke="#ffffff"
              fill="#ffffff"
              fillOpacity={0.25}
            />

          </RadarChart>
        </ResponsiveContainer>
      </div>

    </Card>
  );
};