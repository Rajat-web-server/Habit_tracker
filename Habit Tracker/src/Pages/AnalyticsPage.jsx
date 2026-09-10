import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";

export const AnalyticsPage = ({ habitList }) => {
  return (
    
     <div className="min-h-screen w-full bg-black pt-12 text-white">
    
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader className="shrink-0 border-b border-white/10 px-6 py-6 text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Habit Heatmap
            </CardTitle>

            <p className="mt-2 text-sm text-gray-400">
              Track your consistency throughout the year.
            </p>
          </CardHeader>
        

        {/* Heatmaps */}
        
        <CardContent className="min-h-0 flex-1 overflow-hidden p-6">
          <ScrollArea className="h-full">
            <div className="mb-20 flex flex-col gap-5 pr-4">
              {habitList.map((habit) => (
                <Card
                  key={habit.id}
                  className="w-full rounded-2xl border border-white/10 bg-[#111313] p-6 text-white shadow-none transition-colors hover:border-green-500/30"
                >
                  <CardTitle className="mb-6 text-center text-3xl font-bold text-white">
                    {habit.title}
                  </CardTitle>

                  <div className="flex w-full justify-center overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d0e] p-8">
                    <HabitHeatMap completionDate={habit.completionDate} />
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        </motion.div>
      </div>
    </div>
  );
};
