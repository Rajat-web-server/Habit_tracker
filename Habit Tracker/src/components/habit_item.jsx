import { useState, useEffect } from "react";
import { Input } from "./input";
import "./habit_item.css";

export const Habititem = ({
  habit,
  index,
  updateHabit,
  deleteHabit,
  Counter,
  setCounter,
  updateCounterList,
  Checkbox,
  setCheckbox,
  state, setstate
}) => {
  let [isEditing, setisEditing] = useState(false);
  let [editHabit, seteditHabit] = useState(habit);

  //   const click = () => {
  //     updateCounterList(index, Counter + 1);
  //   };
  const reset = () => {
    setCounter(0);
    updateCounterList(index, 0);
    setstate(true);
    setCheckbox(false)

  };

  const edit = () => {
    setisEditing(true);
  };
  const submit = () => {
    updateHabit(index, editHabit);
    setisEditing(false);
  };
  const delete_ = () => {
    deleteHabit(index);
  };
  const checked = () => {
    if (Checkbox===false) {
      updateCounterList(index, Counter + 1);
      console.log("checkbox was false and it will be true now")
      setCheckbox(!Checkbox);
      setstate(!state)
    } else {
      setCheckbox(!Checkbox);
      console.log("checkbox was true and it will be false now")
    }
    
  };
  useEffect(() => {
    console.log(Checkbox);
    console.log("Counter :",Counter)
  }, [Checkbox,Counter]);

  return (
    <div className="container">
      {isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Write  task"
            value={editHabit}
            onChange={(e) => seteditHabit(e.target.value)}
          />
          <button onClick={submit}>submit</button>
          <p className="text">{editHabit}</p>
        </div>
      ) : (
        <p className="text">{habit}</p>
      )}


      <div className="buttons">
        <button>{Counter}</button>
        <button onClick={reset}>reset</button>
        <button onClick={edit}>Edit</button>
        <button onClick={delete_}>delete</button>
        {

        //  state ? (
        //   <input type="checkbox" onChange={checked}/>
        //  ):(
        //   <h2>Task completed</h2>
        //  )
          state &&
           <input type="checkbox" onChange={checked}/>
        }
        
      </div>
    </div>
  );
};
