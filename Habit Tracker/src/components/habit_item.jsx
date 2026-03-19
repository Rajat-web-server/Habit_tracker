import { useState } from "react"
import "./habit_item.css"

export const Habititem = ({ habit }) => {

    let [Counter, setCounter] = useState(0)

    const click = () => {
        setCounter(Counter + 1)
    }
    const reset = () => {
        setCounter(0)
    }
    return (

        <div className="container">
            <p className="text">
                {habit}
            </p>
            <div className="buttons">
                <button onClick={click} >{Counter}</button>
                <button onClick={reset}>reset</button>
                <button>Edit</button>
            </div>

        </div>
    )
}
