// import "./input.css"

export const Input =({setHabit, habit})=>{

    return(
        <div>
          <input type="text" placeholder="Enter habit" value={habit} id="input" onChange={(e)=>setHabit(e.target.value)} />   
        </div>
        
    )
}
