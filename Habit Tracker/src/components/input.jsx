// import "./input.css"

export const Input =({setHabit, habit})=>{

    return(
        <div>
          <input className="bg-green-100 text-cyan-950 p-2 rounded border-[#6FCF97] border-2" type="text" placeholder="Enter habit" value={habit} id="input" onChange={(e)=>setHabit(e.target.value)} />   
        </div>
        
    )
}
