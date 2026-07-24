import { Card } from "../ui/card";
import { RadarChart, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

export const WeeklyRadarChart=()=> {
  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-semibold text-fg">Habit consistency — last 7 days</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="habit" tick={{ fill: "var(--muted-fg)", fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "var(--muted-fg)", fontSize: 10 }} />
            <Tooltip formatter={(v) => [`${v}%`, "Consistency"]} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Radar name="Consistency" dataKey="consistency" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

