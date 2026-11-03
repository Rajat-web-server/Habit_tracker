import { HabitHeatMap } from "../heatmap/habitheatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";

export const AnalyticsPage = ({ habitList }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
  <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full flex-col">

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader className="shrink-0 border-b border-white/10 px-4 py-5 text-center sm:px-6 sm:py-6">
        <CardTitle className="text-2xl font-bold text-white sm:text-3xl">
          Habit Heatmap
        </CardTitle>

        <p className="mt-2 text-xs text-gray-400 sm:text-sm">
          Track your consistency throughout the year.
        </p>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-3 py-5 sm:p-6">
        <div className="mb-16 flex min-w-0 flex-col gap-4 sm:gap-5 sm:pr-4">
          {habitList.map((habit) => (
            <Card
              key={habit.id}
              className="w-full rounded-xl border border-white/10 bg-[#111313] p-3 text-white shadow-none transition-colors hover:border-green-500/30 sm:rounded-2xl sm:p-3"
            >
              <CardTitle className="mb-1 text-center text-lg font-semibold sm:mb-2 sm:text-2xl">
                {habit.title}
              </CardTitle>

              {/* Heatmap horizontal scrolling */}
              <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x">
                <div className="w-max min-w-full py-2">
                  <HabitHeatMap completions={habit.completions} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </motion.div>
  </div>
</div>
  );
};
