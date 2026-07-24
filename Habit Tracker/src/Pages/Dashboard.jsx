// import { SimpleRadarChart } from "../components/Dashboard_analytics/radar"; 
import { Greeting } from "@/components/Dashboard_analytics/greetings";
import { HabitPreviewList } from "@/components/Dashboard_analytics/habitPreviewList";
import { MotivationalQuote } from "@/components/Dashboard_analytics/Motivation_Quote";
// import { WeeklyConsistencyChart } from "@/components/Dashboard_analytics/weeklyConsistenyChart";
// import { WeeklyRadarChart } from "../components/Dashboard_analytics/radar";
// import { StatsCards } from "@/components/Dashboard_analytics/statsCard";
export const Dashboard=({habitList, habit,updateHabit, now})=> {
  return (
    <div>
      <div className="mx-auto pt-15 max-w-5xl space-y-6 px-4 py-6">
        <Greeting />
 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><HabitPreviewList habitList={habitList} habit={habit} updateHabit={updateHabit}/></div>
          {console.log("habitlist from dashboard : ",habitList)}
          <div className="lg:col-span-1"><MotivationalQuote /></div>
        </div>
 
        {/* <StatsCards habitList={habitList} habit={habit}/> */}
 
        {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <WeeklyRadarChart />
          <WeeklyConsistencyChart />
        </div> */}
      </div>
      {/* <h1>This is Dashboard page</h1> */}
    </div>
  );
}

