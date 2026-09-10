import { Card } from "@/components/ui/card";

export const HabitPreviewList = ({ habitList, updateHabit }) => {
  const today = new Date().toISOString().slice(0, 10);

  // -------------------------
  // Toggle today's habit
  // -------------------------

  const toggleHabit = (habit, index) => {
    let updatedCompletion;

    if (habit.completionDate.includes(today)) {
      updatedCompletion = habit.completionDate.filter(
        (date) => date !== today
      );
    } else {
      updatedCompletion = [
        ...habit.completionDate,
        today,
      ];
    }

    const updatedHabit = {
      ...habit,
      completionDate: updatedCompletion,
      counter: updatedCompletion.length,
    };

    updateHabit(index, updatedHabit);
  };

  // -------------------------
  // Current streak
  // -------------------------

  const currentStreak = (habit) => {
    let streak = 0;
    let date = new Date();

    while (true) {
      const key = date.toISOString().slice(0, 10);

      if (habit.completionDate.includes(key)) {
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

            const done =
              habit.completionDate.includes(today);

            const streak = currentStreak(habit);

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
                    onChange={() =>
                      toggleHabit(habit, index)
                    }
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
                      Completed {habit.counter} times
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
