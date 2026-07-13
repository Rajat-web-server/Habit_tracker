import { SimpleRadarChart } from "../components/Dashboard_analytics/radar"; 
import { Greeting } from "@/components/Dashboard_analytics/greetings";
import { HabitPreviewList } from "@/components/Dashboard_analytics/habitPreviewList";
import { MotivationalQuote } from "@/components/Dashboard_analytics/Motivation_Quote";
import { WeeklyRadarChart } from "../components/Dashboard_analytics/radar";
import { StatsCards } from "@/components/Dashboard_analytics/statsCard";
export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-bg font-sans"
    >
      <Navbar />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <Greeting />
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><HabitPreviewList /></div>
          <div className="lg:col-span-1"><MotivationalQuote /></div>
        </div>
 
        <StatsCards />
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <WeeklyRadarChart />
          <WeeklyConsistencyChart />
        </div>
      </div>
    </div>
  );
}

