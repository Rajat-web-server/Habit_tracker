import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
export const AnalyticsPage = ({ habitList }) => {
  return (
    <>
      <card className="h-screen flex flex-col mt-25  ">
        
          <CardHeader className="text-center pb-5 font-bold text-3xl shrink-0 border-b">
            The Analytics Page
          </CardHeader>

          {/* scrollable area */}

          <CardContent className="overflow-hidden flex-1 min-h-0 ">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 pr-4 space-y-4 ">
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
        
      </card>
    </>
  );
};
