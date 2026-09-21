import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

import { ButtonGroup } from "./ui/button-group";
import { motion } from "motion/react";
import { MoreVertical } from "lucide-react";

export const Habititem = ({ habit, index, updateHabit, deleteHabit, now }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editHabit, setEditHabit] = useState(habit.title);

  useEffect(() => {
    setEditHabit(habit.title);
  }, [habit]);

  // -------------------------
  // Generate last 7 days
  // -------------------------

  const weekFunc = () => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdata = [];

    for (let index = 0; index < 7; index++) {
      const currentDay = new Date(now);

      currentDay.setDate(now.getDate() - index);

      const fullDate = `${currentDay.getFullYear()}-${String(
        currentDay.getMonth() + 1,
      ).padStart(2, "0")}-${String(currentDay.getDate()).padStart(2, "0")}`;

      weekdata.push({
        dayName: week[currentDay.getDay()],
        date: currentDay.getDate(),
        completion: fullDate,
      });
    }

    return weekdata;
  };

  const weekdata = weekFunc();
  const today = weekdata[0].completion;
  const isTodayChecked = habit.completionDate.includes(today);

  // -------------------------
  // Toggle completion
  // -------------------------

  const checked = (completion) => {
    let updatedCompletion;

    if (habit.completionDate.includes(completion)) {
      updatedCompletion = habit.completionDate.filter(
        (date) => date !== completion,
      );
    } else {
      updatedCompletion = [...habit.completionDate, completion];
    }

    const updatedHabit = {
      ...habit,
      completionDate: updatedCompletion,
      counter: updatedCompletion.length,
    };

    updateHabit(index, updatedHabit);
  };

  // -------------------------
  // Reset
  // -------------------------

  const reset = () => {
    const updatedHabit = {
      ...habit,
      counter: 0,
      completionDate: [],
    };

    updateHabit(index, updatedHabit);
  };

  // -------------------------
  // Edit
  // -------------------------

  const edit = () => {
    setIsEditing(true);
  };

  // -------------------------
  // Submit edit
  // -------------------------

  const submit = () => {
    if (!editHabit.trim()) return;

    const updatedHabit = {
      ...habit,
      title: editHabit,
    };

    updateHabit(index, updatedHabit);
    setIsEditing(false);
  };

  // -------------------------
  // Delete
  // -------------------------

  const delete_ = () => {
    deleteHabit(index);
  };

  return (
    <motion.div
      animate={{
        scale: isTodayChecked ? 1.01 : 1,
        y: isTodayChecked ? -2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      whileHover={{
        y: -2,
      }}
    >
      <Card className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111313] text-white shadow-none">
        <div className="overflow-x-auto">
          <div
            className="
        grid min-w-[620px]
        grid-cols-[1.2fr_1.4fr_3fr_0.6fr]
        items-center
        gap-2
        p-3

        sm:min-w-[750px]
        sm:grid-cols-[1.2fr_1.5fr_3fr_0.7fr]
        sm:gap-4
        sm:p-4

        lg:min-w-[1000px]
        lg:gap-8
        lg:p-6
      "
          >
            {/* =====================
          HABIT NAME
      ====================== */}
            <div className="min-w-0">
              {isEditing ? (
                <div className="flex flex-col gap-1 sm:gap-2">
                  <Input
                    type="text"
                    value={editHabit}
                    onChange={(e) => setEditHabit(e.target.value)}
                    className="h-8 border-white/10 bg-[#0d0d0e] text-sm text-white focus-visible:ring-green-500 sm:h-9"
                  />

                  <Button
                    variant="ghost"
                    className="h-7 w-fit border border-green-500/30 px-2 text-xs text-green-400 hover:bg-green-500/10 hover:text-green-400 sm:h-8 sm:px-3 sm:text-sm"
                    onClick={submit}
                  >
                    Submit
                  </Button>
                </div>
              ) : (
                <p className="break-words text-xs font-semibold text-white sm:text-base lg:text-xl">
                  {habit.title}
                </p>
              )}
            </div>

            {/* =====================
          ACTION MENU
      ====================== */}
            <div className="flex justify-center">
              <ButtonGroup>
                <Button
                  variant="outline"
                  onClick={reset}
                  className="h-7 border-white/10 bg-[#0d0d0e] px-2 text-[10px] text-gray-300 hover:bg-white/10 hover:text-white sm:h-8 sm:px-2.5 sm:text-xs lg:h-9 lg:px-3 lg:text-sm"
                >
                  Reset
                </Button>

                <Button
                  variant="outline"
                  onClick={edit}
                  className="h-7 border-white/10 bg-[#0d0d0e] px-2 text-[10px] text-gray-300 hover:bg-white/10 hover:text-white sm:h-8 sm:px-2.5 sm:text-xs lg:h-9 lg:px-3 lg:text-sm"
                >
                  Edit
                </Button>

                <Button
                  variant="outline"
                  onClick={delete_}
                  className="h-7 border-red-500/20 bg-[#0d0d0e] px-2 text-[10px] text-red-400 hover:bg-red-500/10 hover:text-red-400 sm:h-8 sm:px-2.5 sm:text-xs lg:h-9 lg:px-3 lg:text-sm"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>

            {/* =====================
          LAST 7 DAYS
      ====================== */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {weekdata.map((day) => {
                const isChecked = habit.completionDate.includes(day.completion);

                return (
                  <div
                    key={day.completion}
                    className={`flex h-12 w-7 shrink-0 flex-col items-center justify-between rounded-lg border px-0.5 py-1 transition-colors sm:h-16 sm:w-10 sm:rounded-xl sm:py-2 lg:h-20 lg:w-12 lg:rounded-2xl ${
                      isChecked
                        ? "border-green-500/40 bg-green-500/10"
                        : "border-white/10 bg-[#0d0d0e]"
                    }`}
                  >
                    <p className="text-[8px] font-medium text-gray-400 sm:text-[10px] lg:text-sm">
                      {day.date}
                    </p>

                    <p
                      className={`text-[8px] font-semibold sm:text-[10px] lg:text-sm ${
                        isChecked ? "text-green-400" : "text-gray-300"
                      }`}
                    >
                      {day.dayName}
                    </p>
                    <motion.div
                      whileTap={{ scale: 1.5 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 15,
                      }}
                    >
                      <Button
                        variant="ghost"
                        className="h-4 w-4 bg-transparent p-0 shadow-none hover:bg-transparent sm:h-5 sm:w-5 lg:h-7 lg:w-7"
                        onClick={() => checked(day.completion)}
                      >
                        <motion.span
                          animate={{
                            scale: isChecked ? 1.3 : 1,
                            opacity: isChecked ? 1 : 0.6,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                          className="text-[9px] sm:text-xs lg:text-sm"
                        >
                          {isChecked ? "✓" : "○"}
                        </motion.span>
                      </Button>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* =====================
          COUNTER
      ====================== */}
            <div className="flex justify-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base font-semibold transition-colors sm:h-12 sm:w-12 sm:rounded-xl sm:text-xl lg:h-16 lg:w-16 lg:rounded-2xl lg:text-3xl ${
                  habit.counter > 0
                    ? "border-green-500/40 bg-green-500/10 text-green-400"
                    : "border-white/10 bg-[#0d0d0e] text-gray-400"
                }`}
              >
                {habit.counter}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
