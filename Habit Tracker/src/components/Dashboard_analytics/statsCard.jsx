// src/components/dashboard/StatsCards.jsx
import { Flame, TrendingUp, Trophy, ListTodo } from "lucide-react";
import { Card } from "@/components/ui/card";
// import { useHabits } from "@/context/HabitsContext";
import { HabitUtils } from "./habitutils";

function StatCard({ icon: Icon, label, value, sub, tone }) {
  return (
    <Card className="flex items-start justify-between gap-3 p-4">
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-fg">{label}</p>
        <p className="mt-1 truncate text-2xl font-semibold tracking-tight text-fg">
          {value}
        </p>
        {sub && (
          <p className="mt-0.5 truncate text-xs text-muted-fg">{sub}</p>
        )}
      </div>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: tone.bg, color: tone.fg }}
      >
        <Icon size={18} />
      </span>
    </Card>
  );
}

export const StatsCards = () => {
  const { habits } = useHabits();

  const bestStreak = getBestStreakHabit(habits);
  const weekly = getWeeklyConsistencyByDay(habits);
  const weeklyAvg = weekly.length
    ? Math.round(weekly.reduce((sum, d) => sum + d.percentage, 0) / weekly.length)
    : 0;
  const best = getBestHabit(habits);
  const remainingToday = getRemainingToday(habits);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Flame}
        label="Best streak"
        value={bestStreak ? `${bestStreak.streak} days` : "—"}
        sub={bestStreak?.habit.name}
        tone={{ bg: "#F9731622", fg: "#F97316" }}
      />
      <StatCard
        icon={TrendingUp}
        label="Weekly consistency"
        value={`${weeklyAvg}%`}
        sub="Across all habits"
        tone={{ bg: "#0EA5E922", fg: "#0EA5E9" }}
      />
      <StatCard
        icon={Trophy}
        label="Best habit"
        value={best?.habit.name ?? "—"}
        sub={best ? `${best.streak}d streak · ${best.consistency}% consistent` : ""}
        tone={{ bg: "#F59E0B22", fg: "#F59E0B" }}
      />
      <StatCard
        icon={ListTodo}
        label="Remaining today"
        value={remainingToday}
        sub={remainingToday === 0 ? "All done!" : "Still to check off"}
        tone={{ bg: "#10B98122", fg: "#10B981" }}
      />
    </div>
  );
};