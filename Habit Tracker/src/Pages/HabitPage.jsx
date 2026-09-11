import { Habititem } from "../components/habit_item";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input_ } from "../components/input";
import "../index.css";

export const HabitPage = ({
  updateHabit,
  deleteHabit,
  habitList,
  now,
  habit,
  setHabit,
  Submit,
}) => {
  return (
    <div className="min-h-screen w-full bg-black pt-2 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full flex-col">
         <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <CardHeader className="border-b border-white/10 px-6 py-6">
          <CardTitle className="text-center text-3xl text-white">
            Habit Tracker
          </CardTitle>

          <CardDescription className="text-center text-gray-400">
            Track your daily habits and build consistency.
          </CardDescription>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="w-full max-w-md">
              <Input_ setHabit={setHabit} habit={habit} />
            </div>

            <Button
              onClick={Submit}
              className="bg-green-500 text-black hover:bg-green-400"
            >
              Add Habit
            </Button>
          </div>
        </CardHeader>

        {/* Habits */}
        <CardContent className="flex-1 min-h-0 p-6">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {habitList.length === 0 ? (
                <p className="py-10 text-center text-gray-400">
                  No habits added yet.
                </p>
              ) : (
                <AnimatePresence initial={false}>
                  {habitList.map((h, index) => (
                    <motion.div
                      key={h.id}
                      layout
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <Habititem
                        habit={h}
                        index={index}
                        updateHabit={updateHabit}
                        deleteHabit={deleteHabit}
                        now={now}
                        habitList={habitList}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        </motion.div>
      </div>
    </div>
  );
};
