import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
export const AnalyticsPage = ({ habitList }) => {
  return (
    <>
      <div className="mt-25  ">
        <div>
          <div className="text-center pb-5 font-bold text-3xl">
            The Analytics Page
          </div>
          <div className="flex flex-col gap-4">
            {habitList.map((habit) => (
              <Card className="flex flex-row justify-center items-center">
                <CardTitle className="p-2 ml-2 font-bold text-3xl">
                  {habit.title}
                </CardTitle>
                <HabitHeatMap
                  key={habit.id}
                  completionDate={habit.completionDate}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
