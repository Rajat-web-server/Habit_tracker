import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
export const AnalyticsPage = ({ habitList }) => {
  return (
    <>
      <div className="mt-25  ">
        <div>
          <div className="text-center pb-5 font-bold text-3xl">
            The Analytics Page
          </div>
          <CardContent>
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 ">
                {habitList.map((habit) => (
                  <Card
                    key={habit.id}
                    className="flex flex-row justify-center items-center border-2 border-grey flex-wrap hover:bg-black hover:text-white"
                  >
                    <CardTitle className="p-2 ml-2 font-bold text-3xl">
                      {habit.title}
                    </CardTitle>

                    <HabitHeatMap completionDate={habit.completionDate} />
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </div>
      </div>
    </>
  );
};
