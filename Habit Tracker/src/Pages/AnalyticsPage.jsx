import { HabitHeatMap } from "../heatmap/habitheatmap";
export const AnalyticsPage = ({ habitList }) => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center ">
        <div className="pt-4  shrink-0">
          <h2 className="p-3 font-bold text-4xl ">
            This is the Analytics Page
          </h2>
          <div className="flex-1 overflow-y-auto">
            {habitList.map((habit) => (
              <div>
                <p>{habit.title}</p>
                <HabitHeatMap
                  key={habit.id}
                  completionDate={habit.completionDate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
