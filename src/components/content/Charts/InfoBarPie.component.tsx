import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { useFlow } from "../../../context/FlowContext";
import { getSymbol } from "../../../utils/getSymbol";

const InfoBarPie: React.FC<InfoBarPieProps> = ({ isExpense, amount }) => {
  const theme = useTheme();
  const { userMonthlyTotalExpenses, userMonthlyTotalIncomes } = useFlow();
  const DATA = [
    {
      name: `Total Monthly ${isExpense ? "Expenses" : "Income"}`,
      value: isExpense ? userMonthlyTotalExpenses : userMonthlyTotalIncomes,
    },
    {
      name: `Current ${isExpense ? "Expenses" : "Income"}`,
      value: amount,
    },
  ];
  return (
    <Box>
      <ResponsiveContainer
        width={theme.sizes.menuExtendedWidth - 200}
        height={250}
      >
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
                  isExpense
                    ? theme.palette.error.main
                    : theme.palette.success.main
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

interface InfoBarPieProps {
  isExpense?: boolean;
  amount: number;
}
