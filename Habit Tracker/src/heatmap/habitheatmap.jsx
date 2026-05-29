import React from "react";
import Tooltip from '@uiw/react-tooltip';
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";

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
         legendCellSize={0}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2026/01/01")}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={5} />}
        rectProps={{
          rx: 5
        }}
        rectRender={(props, data) => {
        return (
          <Tooltip placement="top" content={`date: ${data.date}`}>
            <rect {...props} />
          </Tooltip>
        );
      }}
      />
    </div>
  );
}
