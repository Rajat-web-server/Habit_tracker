import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
export const AnalyticsPage = ({ habitList }) => {
  return (
  
      <>
        <div className="h-screen overflow-hidden ">
          <div className="h-full flex flex-col mt-16 overflow-hidden text-textcolor1 bg-bgcolor1">
            <CardHeader className="text-center pb-5 font-bold text-3xl shrink-0 border-b mt-10 mb-5">
              The Analytics Page
            </CardHeader>
            {/* scrollable area */}
            <CardContent className="overflow-hidden flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-4 pr-4 space-y-4 mb-20">
                  {habitList.map((habit) => (
                    <Card
                      key={habit.id}
                      className="flex flex-row justify-center items-center border-2 border-grey  text-textcolor1 flex-wrap hover:bg-bgcolor2 hover:text-white"
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
