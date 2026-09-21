import { Flame, TrendingUp, Trophy, ListTodo } from "lucide-react";
import { motion } from "motion/react";

import { Card } from "@/components/ui/card";

function StatCard({ icon: Icon, label, value, sub, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.08,
      }}
    >
      <Card className="flex items-start justify-between gap-3 border border-white/10 bg-[#111313] p-4 text-white transition-colors hover:border-green-500/30">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-400">{label}</p>

          <p className="mt-1 truncate text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>

          {sub && (
            <p className="mt-0.5 truncate text-xs text-gray-400">{sub}</p>
          )}
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
          <Icon size={18} />
        </span>
      </Card>
    </motion.div>
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
        index={0}
        icon={Flame}
        label="Best streak"
        value={bestStreak ? `${bestStreak.streak} days` : "—"}
        sub={bestStreak?.habit?.title}
      />

      {/* Weekly Consistency */}
      <StatCard
        index={1}
        icon={TrendingUp}
        label="Weekly consistency"
        value={`${consistency}%`}
        sub="Across all habits"
      />

      {/* Best Habit */}
      <StatCard
        index={2}
        icon={Trophy}
        label="Best habit"
        value={bestHabit?.habit?.title ?? "—"}
        sub={
          bestHabit
            ? `${bestHabit.streak}d streak · ${bestHabit.consistency}% consistent`
            : ""
        }
      />

      {/* Remaining */}
      <StatCard
        index={3}
        icon={ListTodo}
        label="Remaining today"
        value={Remaining}
        sub={Remaining === 0 ? "All done!" : "Still to check off"}
      />
    </div>
  );
};
