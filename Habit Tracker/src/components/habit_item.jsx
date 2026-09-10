import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

import { ButtonGroup } from "./ui/button-group";

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
    <Card className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111313] text-white shadow-none">
      <div className="overflow-x-auto">
        <div className="grid min-w-[1000px] grid-cols-[1.2fr_1.5fr_3fr_0.7fr] items-center gap-8 p-6">
          {/* =====================
              HABIT NAME
          ====================== */}

          <div className="min-w-0">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  value={editHabit}
                  onChange={(e) => setEditHabit(e.target.value)}
                  className="border-white/10 bg-[#0d0d0e] text-white focus-visible:ring-green-500"
                />

                <Button
                  variant="ghost"
                  className="w-fit border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-400"
                  onClick={submit}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <p className="break-words text-sm font-semibold text-white sm:text-lg lg:text-xl">
                {habit.title}
              </p>
            )}
          </div>

          {/* =====================
              ACTION MENU
          ====================== */}

          <ButtonGroup>
            <Button
              variant="outline"
              onClick={reset}
              className="border-white/10 bg-[#0d0d0e] text-gray-300 hover:bg-white/10 hover:text-white"
            >
              Reset
            </Button>

            <Button
              variant="outline"
              onClick={edit}
              className="border-white/10 bg-[#0d0d0e] text-gray-300 hover:bg-white/10 hover:text-white"
            >
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={delete_}
              className="border-red-500/20 bg-[#0d0d0e] text-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              Delete
            </Button>
          </ButtonGroup>

          {/* =====================
              LAST 7 DAYS
          ====================== */}

          <div className="flex items-center justify-start gap-2">
            {weekdata.map((day) => {
              const isChecked = habit.completionDate.includes(day.completion);

              return (
                <div
                  key={day.completion}
                  className={`flex h-14 w-9 shrink-0 flex-col items-center justify-between rounded-xl border px-0.5 py-1 transition-colors sm:h-16 sm:w-10 sm:rounded-2xl sm:py-2 lg:h-20 lg:w-12 ${
                    isChecked
                      ? "border-green-500/40 bg-green-500/10"
                      : "border-white/10 bg-[#0d0d0e]"
                  }`}
                >
                  <p className="text-[10px] font-medium text-gray-400 sm:text-xs lg:text-sm">
                    {day.date}
                  </p>

                  <p
                    className={`text-[10px] font-semibold sm:text-xs lg:text-sm ${
                      isChecked ? "text-green-400" : "text-gray-300"
                    }`}
                  >
                    {day.dayName}
                  </p>

                  <Button
                    variant="ghost"
                    className="h-5 w-5 bg-transparent p-0 shadow-none hover:bg-transparent sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                    onClick={() => checked(day.completion)}
                  >
                    <span className="text-[10px] sm:text-xs lg:text-sm">
                      {isChecked ? "✓" : "○"}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* =====================
              COUNTER
          ====================== */}

          <div className="flex justify-start lg:justify-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl font-semibold transition-colors sm:h-14 sm:w-14 sm:text-2xl lg:h-16 lg:w-16 lg:rounded-2xl lg:text-3xl ${
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
  );
};
