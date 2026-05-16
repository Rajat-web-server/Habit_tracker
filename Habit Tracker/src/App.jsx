import { useState, useEffect } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {
    const keyName = "habits"

    const [habit, setHabit] = useState("")
    const [habitList, sethabitList] = useState(() => {
        const storedHabit = localStorage.getItem(keyName)
        return storedHabit ? JSON.parse(storedHabit) : []
    })
    const now =new Date();
     

    const Submit = () => {
        if(!habit.trim()) return ;
        const newHabit={
            id:now.getTime(),
            title:habit,
            counter:0,
            checked:false,
            completionDate:[
                now.toISOString()
            ]
        }
        sethabitList([...habitList,newHabit]);//immutable state updates
        setHabit("");
    }

    const updateHabit = (index, newValue) => {
        const updatedhabits = [...habitList]
        updatedhabits[index] = newValue;
        sethabitList(updatedhabits)
        
    }
    const deleteHabit = (index) => {
        const updatedList = habitList.filter((_, i) => i !== index)
        sethabitList(updatedList)
    }

    useEffect(() => {
        localStorage.setItem(keyName, JSON.stringify(habitList));
    }, [keyName, habitList])

    return (
        <div>
            <Input setHabit={setHabit} habit={habit} />
            <button onClick={Submit}>Submit</button>
            {habitList.map((h, index) => (
                <Habititem key={h.id} habit={h} index={index} updateHabit={updateHabit} deleteHabit={deleteHabit} 
                 />
            ))}

        </div>
    )
}

export default App
