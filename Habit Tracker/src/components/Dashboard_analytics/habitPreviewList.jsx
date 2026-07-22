import { Card } from "@/components/ui/card";

export const HabitPreviewList = ({ habitList, updateHabit }) => {
  const today = new Date().toISOString().slice(0, 10);

  const toggleHabit = (habit, index) => {
    let updatedCompletion;

    if (habit.completionDate.includes(today)) {
      updatedCompletion = habit.completionDate.filter((d) => d !== today);
    } else {
      updatedCompletion = [...habit.completionDate, today];
    }

    const updatedHabit = {
      ...habit,
      completionDate: updatedCompletion,
      counter: updatedCompletion.length,
    };

    updateHabit(index, updatedHabit);
  };
  console.log("habit list1 :", habitList);
console.log("habitlist 2 : ",habitList.habitList);
  console.log(typeof habitList);
  // console.log(Array.isArray(habitList));

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
  let rendered_habits;
  try {
    console.log("habit list :", habitList);
    console.log("update habit :", updateHabit);
    rendered_habits = habitList.map((habit, index) => {
      const done = habit.completionDate.includes(today);

      return (
        <div
          key={habit.id}
          className={`flex items-center justify-between rounded-lg border p-3 ${
            done ? "bg-green-100" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleHabit(habit, index)}
            />

            <div>
              <p className={`font-medium ${done ? "line-through" : ""}`}>
                {habit.title}
              </p>

              <p className="text-xs text-gray-500">
                Completed {habit.counter} times
              </p>
            </div>
          </div>

          <div className="text-sm font-semibold">🔥 {currentStreak(habit)}</div>
        </div>
      );
    });
  } catch (err) {
    console.log("ERROR : ", err);
  }
  return (
    <Card className="p-4 h-full">
      <h2 className="font-semibold mb-4">Today's Habits</h2>

      <div className="space-y-3">{rendered_habits}</div>
    </Card>
  );
};
