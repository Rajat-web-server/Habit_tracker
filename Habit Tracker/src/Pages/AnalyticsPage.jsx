import { HabitHeatMap } from "../heatmap/habitheatmap";
export const AnalyticsPage = ({ habitList }) => {
  return (
    <>
    <div style={{paddingTop:"800px"}}>

      <h2 style={{ padding: "25px" }}>This is the Analytics Page</h2>
      {habitList.map((habit) => (
        <div
          style={{
            padding: "5px",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "5px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center", 
            paddingTop:"30px",

          }}
        >
          <p>{habit.title}</p>
          <HabitHeatMap key={habit.id} completionDate={habit.completionDate} />
        </div>
      ))}
    </div>
    </>
  );
};
