import { StatsCards } from "@/components/Dashboard_analytics/statsCard";
import { HabitPreviewList } from "@/components/Dashboard_analytics/habitPreviewList";
import { HabitUtils } from "@/components/Dashboard_analytics/habitutils";
import { WeeklyRadarChart } from "@/components/Dashboard_analytics/radar";
import { MotivationalQuote } from "@/components/Dashboard_analytics/Motivation_Quote";
import { Greeting } from "@/components/Dashboard_analytics/greetings";

export const Dashboard = ({
  habitList,
  habit,
  updateHabit,
  now,
}) => {
  const {
    bestStreak,
    bestHabit,
    consistency,
    Remaining,
    radarData,
  } = HabitUtils({
    habitList,
    now,
  });

  return (
    <div>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 pt-15">

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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Habit List */}
          <div className="lg:col-span-2">
            <HabitPreviewList
              habitList={habitList}
              habit={habit}
              updateHabit={updateHabit}
            />
          </div>

          {/* Quote */}
          <MotivationalQuote />

        </div>

        {/* Radar Chart */}
        <WeeklyRadarChart
          radarData={radarData}
        />

      </div>
    </div>
  );
};