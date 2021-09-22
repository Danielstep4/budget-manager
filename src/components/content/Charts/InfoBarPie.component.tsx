import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { useFlow } from "../../../context/FlowContext";
import { getSymbol } from "../../../utils/getSymbol";

const InfoBarPie: React.FC = () => {
  const theme = useTheme();
  // eslint-disable-next-line
  const { userMonthlyTotalExpenses, userMonthlyTotalIncomes } = useFlow();
  const DATA = [
    {
      name: "Total Monthly Expenses",
      value: userMonthlyTotalExpenses,
    },
    {
      name: "Current Expense",
      value: 10,
    },
  ];
  return (
    <Box height="100%" position="absolute" left="0" right="0" mx="auto">
      <ResponsiveContainer width={700} height="80%">
        <PieChart width={400} height={250}>
          <Pie
            data={DATA}
            dataKey={(data) => data.value}
            nameKey={(data) => data.name}
            innerRadius={50}
            outerRadius={60}
            stroke={theme.palette.common.black}
            paddingAngle={5}
            label={(data) => data.name + " - " + data.value + getSymbol("ILS")}
            labelLine={false}
          >
            {DATA.map((obj: any, i: number) => (
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

export default InfoBarPie;
