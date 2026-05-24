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
    const week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const weekdata = {};
    for (let index = 0; index < 7; index++) {
      const currentDay = new Date();
      currentDay.setDate(now.getDate() - index);
      const dayName = week[currentDay.getDay()];
      weekdata[dayName] = {
        date: currentDay.getDate(),
        checked: false,
        month: currentDay.getMonth() + 1,
        year: currentDay.getFullYear(),
      };
    }
    console.log(weekdata);
    return weekdata;
  };

  const Submit = () => {
    if (!habit.trim()) return;
    const newHabit = {
      id: now.toLocaleString(),
      title: habit,
      counter: 0,
      week: weekFunc(),
      completionDate: [],
    };
    setHabit(newHabit);
    console.log("Habit :", newHabit);
    sethabitList([...habitList, newHabit]);

    setHabit("");
  };
  console.log("newHabit :", habit);
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
          habitList={habitList}
        />
      ))}
    </div>
  );
}

export default App;
