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
    
   const updateHabit=(index, newValue)=>{
    const updatedhabits=[...habitList]
    updatedhabits[index]=newValue;
    sethabitList(updatedhabits)
   }
//    const deleteHabit = (index) => {
//         const updatedList = habitList.filter((_, i) => i !== index)
//         setHabitList(updatedList)
//     }

    // if(habit !="")
    // {
    //     return
    // }else{
    //     habit==""
    //     console.log("empty")
    // }

    return (
        <div>
            <Input setHabit={setHabit} habit={habit}/>
            <button onClick={Submit}>Submit</button>
            {habitList.map((h, index) => (
                <Habititem key={index} habit={h} index={index} updateHabit={updateHabit}/>
            ))}

        </div>
    )
}

export default App
