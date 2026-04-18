// import "./input.css"

export const Input =({setHabit})=>{

    return(
        <div>
          <input type="text" placeholder="Write  task" id="input" onChange={(e)=>setHabit(e.target.value)} />   
        </div>
        
    )
}
