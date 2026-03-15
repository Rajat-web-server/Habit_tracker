import { useState } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {
    const [habit, setHabit] = useState("")
    const [beforeSubmit, afterSubmit]=useState("")

        const Submit = () => {
        afterSubmit(habit)
    }
     
    return (
        <div>
            <Input setHabit={setHabit} />
            <button onClick={Submit}>Submit</button>
            <Habititem habit={beforeSubmit} />

        </div>
    )
}

export default App
