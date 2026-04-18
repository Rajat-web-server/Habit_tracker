import { useState } from 'react'
import { Input } from './components/input'
import { Habititem } from './components/habit_item'
import './App.css'

function App() {
    const keyName = "habits"
    const keyNumber = "0"

    const [habit, setHabit] = useState()
    const [habitList, sethabitList] = useState(()=>{
        const storedHabit = localStorage.getItem(keyName)
        return storedHabit ? JSON.parse(storedHabit):[]
    })
    const Submit = () => {
        sethabitList([...habitList, habit])
    }
    let [Counter, setCounter] = useState(()=>{
        const storedCounter = localStorage.getItem(keyNumber)
        return storedCounter ? JSON.parse(storedCounter): 0
    })
    
   const updateHabit=(index, newValue)=>{
    const updatedhabits=[...habitList]
    updatedhabits[index]=newValue;
    sethabitList(updatedhabits)
   }
   const deleteHabit = (index) => {
        const updatedList = habitList.filter((_, i) => i !== index)
        sethabitList(updatedList)
        const updatedCounter = counterList.filter((_, i) => i !== index)
        setcounterList(updatedCounter)
    }

    useEffect(()=>{
        localStorage.setItem(keyName, JSON.stringify(habitList));
    },[keyName, habitList])

    useEffect(()=>{
        localStorage.setItem(keyNumber, JSON.stringify(Counter));
    },[keyNumber, Counter])

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
                <Habititem key={index} habit={h} index={index} updateHabit={updateHabit} deleteHabit={deleteHabit} Counter={Counter} setCounter={setCounter}/>
            ))}

        </div>
    )
}

export default App
