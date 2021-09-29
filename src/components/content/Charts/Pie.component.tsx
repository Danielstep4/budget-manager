import { Box, useTheme } from "@material-ui/core";
import React from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { useFlow } from "../../../context/FlowContext";
import { getSymbol } from "../../../utils/getSymbol";
import LoadingIndicator from "../../global/LoadingIndicator.component";

const PieComp: React.FC = () => {
  const theme = useTheme();
  const { userMonthlyTotalExpenses, userMonthlyTotalIncomes, isLoading } =
    useFlow();
  const DATA = [
    {
      name: "Expenses",
      value: userMonthlyTotalExpenses,
    },
    {
      name: "Incomes",
      value: userMonthlyTotalIncomes,
    },
  ];
  if (isLoading) return <LoadingIndicator />;
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ResponsiveContainer width={600} height={window.innerHeight - 5}>
        <PieChart width={730} height={250}>
          <Pie
            data={DATA}
            dataKey={(data) => data.value}
            nameKey={(data) => data.name}
            innerRadius={100}
            outerRadius={120}
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

export default PieComp;
