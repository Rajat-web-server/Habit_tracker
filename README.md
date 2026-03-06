# Habit Streak Tracker 🔥

A simple **React-based Habit Tracker** that helps users build consistency by tracking daily habits and maintaining streaks.
The app allows users to add habits, mark them as completed for the day, and maintain a streak count based on consecutive completions.

This project is designed as a **beginner React practice project** to understand core concepts like component structure, state management, and data flow.

---

## 🚀 Features

* ➕ Add new habits
* 🔥 Track daily streaks
* ✅ Mark a habit as completed for the day
* 🔄 Reset streak for a habit
* 📅 Prevent multiple completions in the same day
* 💾 Data persistence using Local Storage
* 🧩 Modular component-based architecture

---

## 🧠 How Streak Logic Works

Each habit stores the following information:

* **name** – Name of the habit
* **streak** – Current consecutive completion count
* **lastCompleted** – Date when the habit was last completed

The streak system follows this logic:

| Situation                             | Result           |
| ------------------------------------- | ---------------- |
| Habit completed again on the same day | No change        |
| Habit completed the next day          | Streak increases |
| One or more days missed               | Streak resets    |

This logic ensures accurate **daily consistency tracking**.

---

## 🏗️ Project Structure

```text
src/
 ├── components/
 │     ├── HabitForm.jsx
 │     ├── HabitList.jsx
 │     ├── HabitItem.jsx
 ├── App.jsx
 ├── main.jsx
```

### Component Responsibilities

**main.jsx**

* Entry point of the application
* Mounts the React app to the DOM

**App.jsx**

* Root component
* Manages global state
* Handles habit creation and updates

**HabitForm.jsx**

* Allows users to input and add a new habit

**HabitList.jsx**

* Displays all habits
* Maps habit data into individual components

**HabitItem.jsx**

* Represents a single habit
* Shows streak count
* Handles completion and reset actions

---

## 📚 React Concepts Practiced

This project helps practice essential React concepts:

* Functional Components
* `useState`
* `useEffect`
* Props
* Event Handling
* Conditional Rendering
* List Rendering with `.map()`
* Component Hierarchy
* Local Storage Integration

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/habit-tracker.git
```

2. Navigate into the project

```bash
cd habit-tracker
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

The app will start locally on:

```
http://localhost:5173
```

---

## 📈 Future Improvements

Possible upgrades to enhance the application:

* 📊 Habit completion statistics
* 📅 Calendar view of completed days
* 🎨 Improved UI styling
* 🔔 Reminder notifications
* ☁️ Backend database support
* 📱 Mobile responsive design

---

## 🎯 Purpose of This Project

This project was built as a **practice application to strengthen beginner-level React development skills** while learning how to design small, functional applications using component-based architecture.

---

## 📜 License

This project is open-source and available under the MIT License.
