import { useState, useEffect } from "react";

import "./habit_item.css";

export const Habititem = ({ habit, index, updateHabit, deleteHabit,now }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editHabit, setEditHabit] = useState(habit.title);

  useEffect(() => {
    setEditHabit(habit.title);
  }, [habit]);

  // TOGGLE CHECKBOX
  const checked = () => {
    const updatedHabit = {
      ...habit,

      checked: !habit.checked,
       
      completionDate: !habit.checked? [...habit.completionDate,now.toLocaleString()]:
      habit.completionDate,

      counter: !habit.checked ? habit.counter + 1 : habit.counter,
    };
 
    

    updateHabit(index, updatedHabit);
  };

  // RESET
  const reset = () => {
    const updatedHabit = {
      ...habit,

      counter: 0,

      checked: false,
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
          {/* {
      [...Array(7)].map((_, index) => {
        date.getDate(index);

        return <button key={index}>✓</button>;
      })
    } */}
        <input type="checkbox" checked={habit.checked} onChange={checked} />
      </div>
    </div>
  );
};
