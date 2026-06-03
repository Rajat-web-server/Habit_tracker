import React from "react";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import "./heatmap.css";

export function HabitHeatMap({ completionDate }) {
  const value = completionDate
    .filter((date) => date)
    .map((date) => ({
      date: date.replaceAll("-", "/"),
      count: 1,
    }));
  return (
    <div className="heatmap_container">
      <HeatMap
        value={value}
        width={700}
        style={{ color: "#F5F5F5" }}
        panelColors={{
          0: "#FFF0E4", // inactive cells
          1: "#306D29",
        }}
        legendCellSize={0}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date(`${new Date().getFullYear()}/01/01`)}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={5} />}
        rectProps={{
          rx: 5,
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
