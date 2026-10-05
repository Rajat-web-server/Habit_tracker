import { Card } from "@/components/ui/card";

export const HabitPreviewList = ({ habitList, updateHabitCompletions }) => {
  const today = new Date().toISOString().slice(0, 10);

  // Get completion dates from backend data
  const getCompletionDates = (habit) => {
    return (habit.completions || []).map((completion) =>
      new Date(completion.date).toISOString().slice(0, 10)
    );
  };

  // Toggle today's completion
  const toggleHabit = async (habit, index) => {
    try {
      const existingCompletion = habit.completions?.find(
        (completion) =>
          new Date(completion.date).toISOString().slice(0, 10) === today
      );

      // If already completed -> remove completion
      if (existingCompletion) {
        const response = await fetch(
          `http://localhost:5000/api/habits/${habit.id}/completions/${existingCompletion.id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        updateHabitCompletions(
          index,
          habit.completions.filter(
            (completion) => completion.id !== existingCompletion.id
          )
        );

        return;
      }

      // If not completed -> create completion
      const response = await fetch(
        `http://localhost:5000/api/habits/${habit.id}/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: today,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      updateHabitCompletions(index, [
        ...(habit.completions || []),
        data.completion,
      ]);
    } catch (error) {
      console.error("Failed to toggle habit:", error);
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

  return (
    <Card className="h-full border border-white/10 bg-[#111313] p-4 text-white">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">
          Today's Habits
        </h2>

        <span className="text-xs text-gray-400">
          {habitList.length}{" "}
          {habitList.length === 1 ? "habit" : "habits"}
        </span>
      </div>

      {/* Habit List */}
      <div className="space-y-3">
        {habitList.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-white/10">
            <p className="text-sm text-gray-500">
              No habits till now
            </p>
          </div>
        ) : (
          habitList.map((habit, index) => {
            const completionDates = getCompletionDates(habit);

            const done = completionDates.includes(today);

            const streak = currentStreak(habit);

            const counter = habit.completions?.length || 0;

            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                  done
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-white/10 bg-[#0d0d0e] hover:border-white/20"
                }`}
              >
                {/* Habit information */}
                <div className="flex min-w-0 items-center gap-3">

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleHabit(habit, index)}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-green-500"
                  />

                  {/* Name + counter */}
                  <div className="min-w-0">
                    <p
                      className={`truncate font-medium ${
                        done
                          ? "text-green-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {habit.title}
                    </p>

                    <p className="text-xs text-gray-500">
                      Completed {counter} times
                    </p>
                  </div>
                </div>

                {/* Streak */}
                <div
                  className={`ml-3 flex shrink-0 items-center gap-1 text-sm font-semibold ${
                    streak > 0
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  🔥
                  <span>{streak}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};