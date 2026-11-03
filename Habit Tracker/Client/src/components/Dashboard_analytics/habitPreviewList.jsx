
import { Card } from "@/components/ui/card";
import { Flame, Check, CircleCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const HabitPreviewList = ({ habitList, updateHabitCompletions }) => {
  const today = new Date().toISOString().slice(0, 10);

  // Get completion dates
  const getCompletionDates = (habit) => {
    return (habit.completions || []).map((completion) =>
      new Date(completion.date).toISOString().slice(0, 10),
    );
  };

  // Toggle today's completion
  const toggleHabit = async (habit, index) => {
  const previousCompletions = habit.completions || [];

  const existingCompletion = previousCompletions.find(
    (completion) =>
      new Date(completion.date).toISOString().slice(0, 10) === today,
  );

  // Optimistically update UI
  if (existingCompletion) {
    updateHabitCompletions(
      index,
      previousCompletions.filter(
        (completion) => completion.id !== existingCompletion.id,
      ),
    );
  } else {
    const optimisticCompletion = {
      id: `temp-${Date.now()}`,
      date: today,
    };

    updateHabitCompletions(index, [
      ...previousCompletions,
      optimisticCompletion,
    ]);
  }

  try {
    let response;

    if (existingCompletion) {
      // Delete completion
      response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/habits/${habit.id}/completions/${existingCompletion.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
    } else {
      // Create completion
      response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/habits/${habit.id}/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ date: today }),
        },
      );
    }

    const data =
      response.status === 204 ? {} : await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update habit");
    }

    // Replace temporary completion with actual database record
    if (!existingCompletion) {
      updateHabitCompletions(
        index,
        [
          ...previousCompletions,
          data.completion,
        ],
      );
    }
  } catch (error) {
    console.error("Failed to toggle habit:", error);

    // Rollback UI if API request fails
    updateHabitCompletions(index, previousCompletions);
  }
};

  // Current streak
  const currentStreak = (habit) => {
    const dates = getCompletionDates(habit);
    let streak = 0;
    let date = new Date();

    while (true) {
      const key = date.toISOString().slice(0, 10);

      if (dates.includes(key)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const completedCount = habitList.filter((habit) =>
    getCompletionDates(habit).includes(today),
  ).length;

  return (
    <Card className="h-full border border-white/10 bg-[#111313] p-4 text-white sm:p-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white">
            Today's Habits
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Small steps, consistent progress.
          </p>
        </div>

        {/* <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
          <span className="text-sm font-semibold text-green-400">
            {completedCount}/{habitList.length}
          </span>
          <span className="ml-1 text-xs text-gray-500">done</span>
        </div> */}
       </div>

      {/* Progress bar */}
      {habitList.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Daily progress</span>
            <span>
              {Math.round((completedCount / habitList.length) * 100)}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-green-500"
              initial={false}
              animate={{
                width: `${(completedCount / habitList.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* Habit List */}
      <div className="space-y-2.5">
        {habitList.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/10">
            <CircleCheck className="mb-2 h-7 w-7 text-gray-600" />
            <p className="text-sm text-gray-400">No habits yet</p>
            <p className="mt-1 text-xs text-gray-600">
              Add a habit to get started.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {habitList.map((habit, index) => {
              const completionDates = getCompletionDates(habit);
              const done = completionDates.includes(today);
              const streak = currentStreak(habit);
              const counter = habit.completions?.length || 0;

              return (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-center justify-between gap-3 rounded-xl border p-3 transition-all duration-200 sm:p-3.5 ${
                    done
                      ? "border-green-500/25 bg-green-500/[0.07]"
                      : "border-white/[0.07] bg-[#0d0d0e] hover:border-white/20 hover:bg-white/[0.025]"
                  }`}
                >
                  {/* Habit information */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">

                    {/* Custom checkbox */}
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={done}
                      aria-label={`Mark ${habit.title} as ${done ? "incomplete" : "complete"}`}
                      onClick={() => toggleHabit(habit, index)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                        done
                          ? "border-green-500 bg-green-500 text-black"
                          : "border-white/25 bg-transparent hover:border-green-500"
                      }`}
                    >
                      {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </button>

                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-medium transition-colors ${
                          done
                            ? "text-green-400"
                            : "text-gray-200 group-hover:text-white"
                        }`}
                      >
                        {habit.title}
                      </p>

                      <p className="mt-1 text-[11px] text-gray-500">
                        {counter} total {counter === 1 ? "completion" : "completions"}
                      </p>
                    </div>
                  </div>

                  {/* Streak */}
                  <div
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 ${
                      streak > 0
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-white/[0.035] text-gray-500"
                    }`}
                  >
                    <Flame
                      className="h-3.5 w-3.5"
                      fill={streak > 0 ? "currentColor" : "none"}
                    />
                    <span className="text-xs font-semibold tabular-nums">
                      {streak}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </Card>
  );
};
