import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import "./habit_item.css";

export const Habititem = ({
  habit,
  index,
  updateHabit,
  deleteHabit,
  now,
  habitList,
}) => {
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

    function consistency() {
      console.log("consistency:", updatedCompletion.slice / 7);
    }
    consistency();
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
    <Card className="flex items-center justify-center  border-2 rounded-2xl m-3 text-textcolor1 hover:bg-black">
      <div className="p-1 flex items-center gap-6.5 ">
        {isEditing ? (
          <div>
            <Input
              type="text"
              value={editHabit}
              onChange={(e) => setEditHabit(e.target.value)}
            />
            <div className=" flex items-center justify-center pt-3">
              <Button variant="ghost" className="border-white" onClick={submit}>
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-2xl font-bold text-white relative right-10">
            {habit.title}
          </p>
        )}
        <div className="flex gap-2">
          <Button variant="ghost" className="border-white" onClick={reset}>
            Reset
          </Button>

          <Button variant="ghost" className="border-white" onClick={edit}>
            Edit
          </Button>

          <Button variant="ghost" className="border-white" onClick={delete_}>
            Delete
          </Button>
        </div>

        <div
          key={habit.id}
          className="flex justify-around gap-4 items-center flex-wrap text-white"
        >
          {weekdata.map((day) => {
            const isChecked = habit.completionDate.includes(day.completetion);
            return (
              <div
                className="border-solid border-2 border-amber-50 rounded-2xl"
                key={day.completetion}
              >
                <p className="text-[15px] text-center">{day.date}</p>
                <p className="text-[15px] text-center">{day.dayName}</p>
                <Button
                  className="h-8 w-8 bg-transparent hover:bg-transparent border-none shadow-none p-0"
                  onClick={() => checked(day.completetion)}
                >
                  <span className="text-sm">{isChecked ? "✅" : "⬜"}</span>
                </Button>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            variant="ghost"
            className="relative left-12 h-18 w-18 text-5xl mr-2 border-white"
          >
            {habit.counter}
          </Button>
        </div>
      </div>
    </Card>
  );
};
