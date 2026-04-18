import { useState, useEffect } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {
    const keyName = "habits"
    const keyNumber = "Counter"

    const [habit, setHabit] = useState("")
    const [habitList, sethabitList] = useState(() => {
        const storedHabit = localStorage.getItem(keyName)
        return storedHabit ? JSON.parse(storedHabit) : []
    })
    let [Counter, setCounter] = useState(0)
    let [counterList, setcounterList] = useState(() => {
        const storedCounter = localStorage.getItem(keyNumber)
        return storedCounter ? JSON.parse(storedCounter): []
    })

    const Submit = () => {
        sethabitList([...habitList, habit])
        setcounterList([...counterList, Counter])
    }

    const updateHabit = (index, newValue) => {
        const updatedhabits = [...habitList]
        updatedhabits[index] = newValue;
        sethabitList(updatedhabits)
    }

    const updateCounterList = (index, newValue) => {
        const updatedCounter = [...counterList]
        updatedCounter[index] = newValue;
        setcounterList(updatedCounter)
    }
    const deleteHabit = (index) => {
        const updatedList = habitList.filter((_, i) => i !== index)
        sethabitList(updatedList)
        const updatedCounter = counterList.filter((_, i) => i !== index)
        setcounterList(updatedCounter)
    }

    useEffect(() => {
        localStorage.setItem(keyName, JSON.stringify(habitList));
    }, [keyName, habitList])

    useEffect(() => {
        localStorage.setItem(keyNumber, JSON.stringify(counterList));
    }, [keyNumber, counterList])

    // if(habit !="")
    // {
    //     return
    // }else{
    //     habit==""
    //     console.log("empty")
    // }

    return (
        <div>
            <Input setHabit={setHabit} habit={habit} />
            <button onClick={Submit}>Submit</button>
            {habitList.map((h, index) => (
                <Habititem key={index} habit={h} index={index} updateHabit={updateHabit} deleteHabit={deleteHabit} Counter={counterList[index]} setCounter={setCounter} updateCounterList={updateCounterList} />
            ))}

        </div>
    )
}

export default App
