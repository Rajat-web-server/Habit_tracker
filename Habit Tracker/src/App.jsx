import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { AnalyticsPage } from "./Pages/AnalyticsPage";
import { HabitPage } from "./Pages/HabitPage";
import { Navbar } from "./components/navbar/navbar";
import { Chart } from "./Pages/chart";
import { HabitUtils } from "./components/Dashboard_analytics/habitutils";
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
      
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                now={now}
                habitList={habitList}
                habit={habit}
                updateHabit={updateHabit}
              />
            }
          />

          <Route
            path="/habits"
            element={
              <HabitPage
                updateHabit={updateHabit}
                deleteHabit={deleteHabit}
                now={now}
                habitList={habitList}
                habit={habit}
                Submit={Submit}
                setHabit={setHabit}
              />
            }
          />
          <Route
            path="/Analytics"
            element={<AnalyticsPage habitList={habitList} />}
          />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
