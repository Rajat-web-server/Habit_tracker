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
    <div className="flex w-full justify-center">
      <HeatMap
        value={value}
        width={1100}
        rectSize={18}
        space={4}
        style={{ color: "#F5F5F5" }}
        panelColors={{
          0: "#171717",
          1: "#14532d",
          2: "#166534",
          3: "#16a34a",
          4: "#22c55e",
        }}
        legendCellSize={0}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date(`${new Date().getFullYear()}/01/01`)}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={5} />}
        rectProps={{ rx: 5 }}
        rectRender={(props, data) => (
          <Tooltip placement="top" content={`date: ${data.date}`}>
            <rect {...props} />
          </Tooltip>
        )}
      />
    </div>
  );
}
