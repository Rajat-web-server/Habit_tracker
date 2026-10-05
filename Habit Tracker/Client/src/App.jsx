import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { AnalyticsPage } from "./Pages/AnalyticsPage";
import { HabitPage } from "./Pages/HabitPage";
import { Navbar } from "./components/navbar/navbar";
import { Chart } from "./Pages/chart";
import { HabitUtils } from "./components/Dashboard_analytics/habitutils";
import { Register } from "./Pages/register";
import { Login } from "./Pages/Login";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  const keyName = "habits";
  const now = new Date();

  const [habit, setHabit] = useState("");
  const [habitList, sethabitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchHabits = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      sethabitList(data.habits);
    } catch (error) {
      console.error("Failed to fetch habits:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHabits();
  }, []);
  const Submit = async () => {
    if (!habit.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: habit,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      sethabitList((prev) => [...prev, data.habit]);

      setHabit("");
    } catch (error) {
      console.error("Failed to create habit:", error);
    }
  };
  console.log("newHabit :", habit);

  const updateHabit = async (index, newValue) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/habits/${newValue.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: newValue.title,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      sethabitList((prev) =>
        prev.map((habit, i) =>
          i === index
            ? {
                ...habit,
                title: data.habit.title,
              }
            : habit,
        ),
      );
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };
  const updateHabitCompletions = (index, completions) => {
    sethabitList((prev) =>
      prev.map((habit, i) =>
        i === index
          ? {
              ...habit,
              completions,
            }
          : habit,
      ),
    );
  };
  const deleteHabit = async (index) => {
    const habitToDelete = habitList[index];

    try {
      const response = await fetch(
        `http://localhost:5000/api/habits/${habitToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      sethabitList((prev) =>
        prev.filter((habit) => habit.id !== habitToDelete.id),
      );
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  return (
    <div>
        {!hideNavbar && <Navbar />}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard
                  habitList={habitList}
                  habit={habit}
                  updateHabit={updateHabit}
                  updateHabitCompletions={updateHabitCompletions}
                  now={now}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/habits"
            element={
              <ProtectedRoute>
                <HabitPage
                  updateHabit={updateHabit}
                  deleteHabit={deleteHabit}
                  now={now}
                  habitList={habitList}
                  updateHabitCompletions={updateHabitCompletions}
                  habit={habit}
                  Submit={Submit}
                  setHabit={setHabit}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage habitList={habitList} />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
