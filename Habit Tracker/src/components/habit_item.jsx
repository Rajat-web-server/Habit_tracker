import { useState, useEffect } from "react";

import "./habit_item.css";
import { Input } from "./input";

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

  // TOGGLE CHECKBOX
  const checked = (day) => {
    const updatedHabit = {
      ...habit,
      week: {
        ...habit.week,

        [day]: {
          ...habit.week[day],

          checked: !habit.week[day].checked,
        },
      },

      completionDate: !habit.week[day].checked
        ? [...habit.completionDate, now.toLocaleString()]
        : habit.completionDate,

      counter: habit.week[day].checked ? habit.counter + 1 : habit.counter - 1,
    };

    updateHabit(index, updatedHabit);
  };

  // RESET
  const reset = () => {
    const updatedHabit = {
      ...habit,

      counter: 0,

      checked: Array(7).fill(false),
    };

    updateHabit(index, updatedHabit);
  };

  // EDIT BUTTON
  const edit = () => {
    setIsEditing(true);
  };

  // SUBMIT EDIT
  const submit = () => {
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
    <div className="container">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editHabit}
            onChange={(e) => setEditHabit(e.target.value)}
          />

          <button onClick={submit}>Submit</button>
        </div>
      ) : (
        <p className="text">{habit.title}</p>
      )}

      <div className="buttons">
        <button>{habit.counter}</button>

        <button onClick={reset}>Reset</button>

        <button onClick={edit}>Edit</button>

        <button onClick={delete_}>Delete</button>
        {habitList.map((habit) => {
          {
            Object.keys(habit.week).map((day) => (
              <div key={day}>
                <p>{day}</p>

                <button onClick={() => checked(day)}>
                  {habit.week[day].checked ? "✅" : "⬜"}
                </button>
              </div>
            ));
          }
        })}
      </div>
    </div>
  );
};
