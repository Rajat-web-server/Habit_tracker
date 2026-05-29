import React from "react";
import HeatMap from "@uiw/react-heat-map";

export function HabitHeatMap({completionDate}) {
  
  const value = 
   completionDate.map((date) => ({
    date: date.replaceAll("-", "/"),
    count: 1,
  }));
    
  return (
    <div>
    
      <HeatMap
        value={value}
        width={700}
        style={{ color: "#F5F5F5"}}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2026/01/01")}
      />
    </div>
  );
}
