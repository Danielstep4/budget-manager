import { Box, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { getTotalFlow } from "../../../utils/db/flow";
import { getSymbol } from "../../../utils/getSymbol";

const PieComp: React.FC = () => {
  const theme = useTheme();
  const DATA = getTotalFlow();
  return (
    <Box position="fixed" right="0" top="0" height="100%">
      <ResponsiveContainer width={700} height="80%">
        <PieChart width={730} height={250}>
          <Pie
            data={DATA}
            dataKey={(DATA) => DATA.value}
            nameKey={(DATA) => DATA.name}
            innerRadius={100}
            outerRadius={120}
            stroke={theme.palette.common.black}
            paddingAngle={5}
            label={(DATA) => DATA.name + " - " + DATA.value + getSymbol("ILS")}
            labelLine={false}
          >
            {DATA.map((obj, i) => (
              <Cell
                key={`cell-${i}`}
                fill={
                  obj.name === "Incomes"
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieComp;
