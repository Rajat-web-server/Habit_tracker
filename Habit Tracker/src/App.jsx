import { useState } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {
    const [habit, setHabit] = useState("")
    const [habitList, sethabitList] = useState([])
    const Submit = () => {
        sethabitList([...habitList, habit])
    }

    return (
        <div>
            <Input setHabit={setHabit} />
            <button onClick={Submit}>Submit</button>
            {habitList.map((h, index) => (
                <Habititem key={index} habit={h} />
            ))}

        </div>
    )
}

export default App
