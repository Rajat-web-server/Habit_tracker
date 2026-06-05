import { Habititem } from "../components/habit_item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="h-screen pt-12 w-full">
      <Card className="h-full flex flex-col">
        {/* Header */}
        <CardHeader className="border-b">
          <CardTitle className="text-4xl text-center">
            Habit Tracker
          </CardTitle>

          <CardDescription className="text-center">
            Track your daily habits and build consistency.
          </CardDescription>

          <div className="flex justify-center items-center gap-4 pt-4">
            <div className="w-full max-w-md">
              <Input_
                setHabit={setHabit}
                habit={habit}
              />
            </div>

            <Button onClick={Submit}>
              Add Habit
            </Button>
          </div>
        </CardHeader>

        {/* Scrollable Habit Section */}
        <CardContent className="flex-1 min-h-0 p-4 ">
          <ScrollArea className="h-full">
            <div className="space-y-4  ">
              {habitList.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No habits added yet.
                  </CardContent>
                </Card>
              ) : (
                habitList.map((h, index) => (
                  <Habititem
                    key={h.id}
                    habit={h}
                    index={index}
                    updateHabit={updateHabit}
                    deleteHabit={deleteHabit}
                    now={now}
                    habitList={habitList}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
