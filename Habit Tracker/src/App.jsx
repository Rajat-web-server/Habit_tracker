import { useState, useEffect } from "react";
import { Input } from "./components/input";
import { Habititem } from "./components/habit_item";
import "./App.css";

function App() {
  const keyName = "habits";
  const now = new Date();

  const [habit, setHabit] = useState("");
  const [habitList, sethabitList] = useState(() => {
    const storedHabit = localStorage.getItem(keyName);
    return storedHabit ? JSON.parse(storedHabit) : [];
  });

  const weekFunc = () => {
    const week = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    const weeks={}

    week.forEach((day,index) => {
      weeks[day] = {
           date : now.getDate(),
         checked : false
      };
    });
    return weeks;
  };
  console.log(weekFunc())

  const Submit = () => {
    if (!habit.trim()) return;
    const newHabit = {
      id: now.toLocaleString(),
      title: habit,
      counter: 0,
      checked: Array(7).fill(false),
      week: weekFunc(),
      completionDate: [],
      /**
       * so how it's gonna be like
       * week :{
       *  "Mon":{
       *   date : now.toLocalString(),
       *   checked : true,
       *
       *
       *  }
       * }
       *
       */
    };
    sethabitList([...habitList, newHabit]); //immutable state updates
    setHabit("");
  };

  const updateHabit = (index, newValue) => {
    const updatedhabits = [...habitList];
    updatedhabits[index] = newValue;
    sethabitList(updatedhabits);
  };
  const deleteHabit = (index) => {
    const updatedList = habitList.filter((_, i) => i !== index);
    sethabitList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(habitList));
  }, [keyName, habitList]);

  return (
    <div>
      <Input setHabit={setHabit} habit={habit} />
      <button onClick={Submit}>Submit</button>
      {habitList.map((h, index) => (
        <Habititem
          key={h.id}
          habit={h}
          index={index}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
          now={now}
        />
      ))}
    </div>
  );
}

export default App;
