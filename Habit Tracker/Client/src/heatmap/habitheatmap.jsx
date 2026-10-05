import React from "react";
import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";

export function HabitHeatMap({ completions = [] }) {
  const value = completions
    .filter((completion) => completion?.date)
    .map((completion) => ({
      date: new Date(completion.date)
        .toISOString()
        .slice(0, 10)
        .replaceAll("-", "/"),
      count: 1,
    }));

  const year = new Date().getFullYear();

  const startDate = new Date(year, 0, 1);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  return (
    <div className="flex w-full justify-center">
      <HeatMap
        value={value}
        width={1100}
        rectSize={17}
        space={2}
        style={{ color: "#F5F5F5" }}
        panelColors={{
          0: "#171717",
          1: "#14532d",
          2: "#166534",
          3: "#16a34a",
          4: "#22c55e",
        }}
        legendCellSize={0}
        weekLabels={[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ]}
        startDate={startDate}
        legendRender={(props) => (
          <rect {...props} y={props.y + 10} rx={5} />
        )}
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