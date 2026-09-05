import {
  Flame,
  TrendingUp,
  Trophy,
  ListTodo,
} from "lucide-react";

import { Card } from "@/components/ui/card";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}) {
  return (
    <Card className="flex items-start justify-between gap-3 bg-[#090c0e] p-4 text-white">
      
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-fg">
          {label}
        </p>

        <p className="mt-1 truncate text-2xl font-semibold tracking-tight text-fg">
          {value}
        </p>

        {sub && (
          <p className="mt-0.5 truncate text-xs text-muted-fg">
            {sub}
          </p>
        )}
      </div>

      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: tone.bg,
          color: tone.fg,
        }}
      >
        <Icon size={18} />
      </span>

    </Card>
  );
}

export const StatsCards = ({
  bestStreak,
  bestHabit,
  Remaining,
  consistency,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Best Streak */}
      <StatCard
        icon={Flame}
        label="Best streak"
        value={
          bestStreak
            ? `${bestStreak.streak} days`
            : "—"
        }
        sub={bestStreak?.habit?.title}
        tone={{
          bg: "#F59E0B22",
          fg: "#F97316",
        }}
      />

      {/* Weekly Consistency */}
      <StatCard
        icon={TrendingUp}
        label="Weekly consistency"
        value={`${consistency}%`}
        sub="Across all habits"
        tone={{
          bg: "#0EA5E922",
          fg: "#0EA5E9",
        }}
      />

      {/* Best Habit */}
      <StatCard
        icon={Trophy}
        label="Best habit"
        value={
          bestHabit?.habit?.title ?? "—"
        }
        sub={
          bestHabit
            ? `${bestHabit.streak}d streak · ${bestHabit.consistency}% consistent`
            : ""
        }
        tone={{
          bg: "#F59E0B22",
          fg: "#F59E0B",
        }}
      />

      {/* Remaining */}
      <StatCard
        icon={ListTodo}
        label="Remaining today"
        value={Remaining}
        sub={
          Remaining === 0
            ? "All done!"
            : "Still to check off"
        }
        tone={{
          bg: "#10B98122",
          fg: "#10B981",
        }}
      />

    </div>
  );
};