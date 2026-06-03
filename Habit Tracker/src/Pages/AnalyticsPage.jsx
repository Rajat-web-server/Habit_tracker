import { HabitHeatMap } from "../heatmap/habitheatmap"
export const AnalyticsPage=({habitList})=>{
    return(
        <>
        <h2 style={{ padding: "25px" }}>This is the Analytics Page</h2>
       {habitList.map((habit) => (
     
        <div>
            <p>{habit.title}</p>
        <HabitHeatMap
          key={habit.id}
          completionDate={habit.completionDate}
        /> 
        </div>
       
    
      ))}
        </>
    )
}