import { StatsCards } from "@/components/Dashboard_analytics/statsCard";
import { HabitPreviewList } from "@/components/Dashboard_analytics/habitPreviewList";
import { HabitUtils } from "@/components/Dashboard_analytics/habitutils";
import { WeeklyRadarChart } from "@/components/Dashboard_analytics/radar";
import { MotivationalQuote } from "@/components/Dashboard_analytics/Motivation_Quote";
import { Greeting } from "@/components/Dashboard_analytics/greetings";
import { WeeklyConsistencyChart } from "@/components/Dashboard_analytics/weeklyConsistenyChart";
import { motion } from "motion/react";
export const Dashboard = ({ habitList, habit, updateHabit, now }) => {
  const { trend, bestStreak, bestHabit, consistency, Remaining, radarData } =
    HabitUtils({
      habitList,
      now,
    });

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 pt-2">
          {/* Greeting */}
          <Greeting />

          {/* Statistics */}
          <StatsCards
            bestStreak={bestStreak}
            bestHabit={bestHabit}
            Remaining={Remaining}
            consistency={consistency}
          />

          {/* Main dashboard */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HabitPreviewList
                habitList={habitList}
                habit={habit}
                updateHabit={updateHabit}
              />
            </div>

            <div className="flex items-center justify-center self-stretch">
              <MotivationalQuote />
            </div>
          </div>

          {/* Weekly Consistency */}
          <WeeklyConsistencyChart trend={trend} />

          {/* Radar Chart */}
          <WeeklyRadarChart radarData={radarData} />
        </div>
      </motion.div>
    </div>
  );
};
