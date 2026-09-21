// import "./input.css"
import { Input } from "./ui/input"

export const Input_ =({setHabit, habit})=>{

    return(
        <div>
          <Input  value={habit} id="input" onChange={(e)=>setHabit(e.target.value)} />   
        </div>
        
    )
}
