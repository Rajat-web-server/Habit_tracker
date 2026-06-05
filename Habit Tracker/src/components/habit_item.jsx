import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import "./habit_item.css";

export const Habititem = ({ habit, index, updateHabit, deleteHabit, now }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editHabit, setEditHabit] = useState(habit.title);
  useEffect(() => {
    setEditHabit(habit.title);
  }, [habit]);

  const weekFunc = () => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdata = [];
    for (let index = 0; index < 7; index++) {
      const currentDay = new Date();
      currentDay.setDate(now.getDate() - index);
      const fullDate = `${currentDay.getFullYear()}-${String(
        currentDay.getMonth() + 1,
      ).padStart(2, "0")}-${String(currentDay.getDate()).padStart(2, "0")}`;
      weekdata.push({
        dayName: week[currentDay.getDay()],
        date: currentDay.getDate(),
        completetion: fullDate,
        checked: false,
        month: currentDay.getMonth() + 1,
        year: currentDay.getFullYear(),
      });
    }

    console.log(weekdata);
    return weekdata;
  };
  const weekdata = weekFunc();

  // TOGGLE CHECKBOX
  const checked = (completetion) => {
    let updatedCompletion;

    if (habit.completionDate.includes(completetion)) {
      updatedCompletion = habit.completionDate.filter(
        (d) => d !== completetion,
      );
    } else {
      updatedCompletion = [...habit.completionDate, completetion];
    }
    const updatedHabit = {
      ...habit,

      completionDate: updatedCompletion,

      counter: updatedCompletion.length,
    };

    updateHabit(index, updatedHabit);
  };

  // RESET
  const reset = () => {
    const updatedHabit = {
      ...habit,

      counter: 0,

      completionDate: [],
    };

    updateHabit(index, updatedHabit);
  };

  // EDIT BUTTON
  const edit = () => {
    setIsEditing(true);
  };

  // SUBMIT EDIT
  const submit = () => {
    if (!editHabit.trim()) return;
    const updatedHabit = {
      ...habit,

      title: editHabit,
    };

    updateHabit(index, updatedHabit);

    setIsEditing(false);
  };

  // DELETE
  const delete_ = () => {
    deleteHabit(index);
  };

  return (
    <div className="flex justify-center items-center border-2 rounded-2xl m-3">
      {isEditing ? (
        <div>
          <Input
            type="text"
            value={editHabit}
            onChange={(e) => setEditHabit(e.target.value)}
          />

          <Button onClick={submit}>Submit</Button>
        </div>
      ) : (
        <p className="text-2xl font-bold flex ml-2">{habit.title}</p>
      )}

      <div className="p-5 flex items-center gap-3.5 hover:bg-black hover:text-white">
        <Button>{habit.counter}</Button>

        <Button onClick={reset}>
          Reset
        </Button>

        <Button onClick={edit}>
          Edit
        </Button>

        <Button onClick={delete_}>
          Delete
        </Button>

        <div key={habit.id} className="flex justify-around gap-4 items-center">
          {weekdata.map((day) => {
            const isChecked = habit.completionDate.includes(day.completetion);
            return (
              <div
                className="border-solid border-2 border-amber-50 rounded-2xl" 
                key={day.completetion}
              >
                <p className="text">{day.date}</p>
                <p className="text">{day.dayName}</p>
                <Button
                  className="checkbox"
                  onClick={() => checked(day.completetion)}
                >
                  {isChecked ? "✅" : "⬜"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
