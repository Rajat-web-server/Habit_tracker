import { useState } from "react"

export const Habititem =({habit})=>{

    const [counter, setcounter]=useState(0)

    const click=()=>{
        setcounter(counter+1)
    }
    return(

        <div>
            <p>
                {habit}
            </p>
            <button onClick={click} >{counter}</button>

        </div>
    )
}
