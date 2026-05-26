import { useState, useEffect } from "react";

import "./habit_item.css";
import { Input } from "./input";

export const Habititem = ({ habit, index, updateHabit, deleteHabit, now }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editHabit, setEditHabit] = useState(habit.title);
  useEffect(() => {
    setEditHabit(habit.title);
  }, [habit]);

  const weekFunc = () => {
    const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const weekdata = [];
    for (let index = 0; index < 7; index++) {
      const currentDay = new Date();
      currentDay.setDate(now.getDate() - index);
      weekdata.push({
        dayName : week[currentDay.getDay()],
        date: currentDay.getDate(),
        completetion: currentDay.toISOString()
    .split("T")[0],
        checked: false,
         month:
          currentDay.getMonth()+1,
        year: currentDay.getFullYear(),
      });
    }
    console.log(weekdata);
    return weekdata;
  };
  const weekdata = weekFunc();

  // TOGGLE CHECKBOX
  const checked = (completetion) => {
    let updatedCompletion ;

    if (habit.completionDate.includes(completetion)){
     updatedCompletion= habit.completionDate.filter(
      (d)=>d !== completetion
     )
    }
    else{
     updatedCompletion=[...habit.completionDate,completetion]
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

      completionDate:[],
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

        <div key={habit.id} className="box">
         {weekdata.map((day)=>{

            const isChecked = habit.completionDate.includes(day.completetion);
          return(

            <div key={day.completetion}>
              <p>{day.date}</p>
              <p>{day.dayName}</p>
              <button onClick={() => checked(day.completetion)}>
                {isChecked ? "✅" : "⬜"}
              </button>
            </div>
          )
})}
        </div>
      </div>
    </div>
  );
};

/**
 * {
            Object.keys(habit.week).map((day) => {
              (
                <div key={day}>
                  <p>{day}</p>
                  <button  onClick={() => checked(day)}>
                    {habit.week[day].checked ? "✅" : "⬜"}
                  </button>
                </div>
              );
            })
          }
 */

/**
 * {
            [Object.keys(habit.week)].map((_, day) => {
              return (
                <div>
                  <p>{day}</p>
                  <button key={day} onClick={() => checked(day)}>
                    {habit.week[day].checked ? "✅" : "⬜"}
                  </button>
                </div>
              );
            });
          }
 */
