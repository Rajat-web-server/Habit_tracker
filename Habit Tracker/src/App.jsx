import { useState } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {

    const [habit,setHabit] = useState("")

    return(
        <div>
            <Input setHabit={setHabit} />
            <Habititem habit={habit}/>
        </div>
    )

}

export default App
