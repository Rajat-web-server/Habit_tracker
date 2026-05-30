import { useState, useEffect } from "react";
import { Input } from "./components/input";
import { Habititem } from "./components/habit_item";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { AnalyticsPage } from "./Pages/AnalyticsPage";
import { HabitPage } from "./Pages/HabitPage";
import "./App.css";

function App() {
  const keyName = "habits";
  const now = new Date();

  const [habit, setHabit] = useState("");
  const [habitList, sethabitList] = useState(() => {
    const storedHabit = localStorage.getItem(keyName);
    return storedHabit ? JSON.parse(storedHabit) : [];
  });
  const Submit = () => {
    if (!habit.trim()) return;
    const newHabit = {
      id: now.toLocaleString(),
      title: habit,
      counter: 0,
      completionDate: [],
    };
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
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/habits" element={<HabitPage/>}/>
        <Route path="/Analytics" element={<AnalyticsPage/>}/>
      </Routes>
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
      <HabitHeatMap/>
    </div>
  );
}

export default App;
