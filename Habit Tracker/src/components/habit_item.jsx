import { useState } from "react"
import { Input } from "./input"
import "./habit_item.css"

<<<<<<< Updated upstream
export const Habititem = ({ habit, index, updateHabit, deleteHabit }) => {
=======
export const Habititem = ({ habit, index, updateHabit, deleteHabit, Counter, setCounter, updateCounterList }) => {
>>>>>>> Stashed changes

    let [Counter, setCounter] = useState(0)
    let [isEditing, setisEditing] = useState(false)
    let [editHabit, seteditHabit] = useState(habit)

    const click = () => {
        updateCounterList(index, Counter + 1)
    }
    const reset = () => {
        setCounter(0)
    }

    const edit = () => {
        setisEditing(true);
    }
    const submit = () => {
        updateHabit(index, editHabit)
        setisEditing(false)
    }
    const delete_ = ()=>{
        deleteHabit(index)
    }

    return (

        <div className="container">
            {
                isEditing ? (
                    <div>
                        <input type="text" placeholder="Write  task" value={editHabit} onChange={(e) => seteditHabit(e.target.value)} />
                        <button onClick={submit}>submit</button>
                        <p className="text">
                             {editHabit}
                        </p>


                    </div>

                ) : (
                    <p className="text">
                        {habit}
                    </p>
                )

            }

            <div className="buttons">
                <button onClick={click} >{Counter}</button>
                <button onClick={reset}>reset</button>
                <button onClick={edit}>Edit</button>
                <button onClick={delete_}>delete</button>
            </div>

        </div>
    )
}
