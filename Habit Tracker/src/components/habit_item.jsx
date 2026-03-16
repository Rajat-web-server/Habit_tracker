import { useState } from "react"

export const Habititem =({habit})=>{

    let [Counter, setCounter]=useState(0)

    const click=()=>{
        setCounter(Counter+1)
    }
    const reset=()=>{
        setCounter(0)
    }
    return(

        <div>
            <p>
                {habit}
            </p>
            <button onClick={click} >{Counter}</button>
            <button onClick={reset}>reset</button>
        </div>
    )
}
