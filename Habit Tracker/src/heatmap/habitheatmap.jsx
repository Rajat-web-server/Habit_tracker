import React from "react";
import HeatMap from "@uiw/react-heat-map";

export function HabitHeatMap(){

    const value = [
    //   { date: "2016/01/11", count: 2 },
    //   { date: "2016/01/12", count: 20 },
    //   { date: "2016/01/13", count: 10 },
    //   ...[...Array(17)].map((_, idx) => ({
    //     date: `2016/02/${idx + 10}`,
    //     count: idx,
    //     content: "",
    //   })),
      { date: "2026/05/20", count: 1 },
      { date: "2026/05/21", count: 4 },
      { date: "2026/05/22", count: 2 },
      { date: "2026/05/23", count: 6 },
    ];

      return (
        <div>
          <HeatMap
            value={value}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            startDate={new Date("2026/01/01")}
          />
        </div>
      );
  
}


