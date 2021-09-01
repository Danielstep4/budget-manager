import { Box, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { useAuth } from "../../../context/AuthContext";
import { getTotalFlow } from "../../../utils/db/flow";
import { getSymbol } from "../../../utils/getSymbol";

const PieComp: React.FC = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getTotalFlow(currentUser!.uid)
      .then((result) => setData(result))
      .catch((e) => console.log(e));
  }, [currentUser]);
  return (
    <Box position="fixed" right="0" top="0" height="100%">
      <ResponsiveContainer width={700} height="80%">
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey={(data) => data.value}
            nameKey={(data) => data.name}
            innerRadius={100}
            outerRadius={120}
            stroke={theme.palette.common.black}
            paddingAngle={5}
            label={(data) => data.name + " - " + data.value + getSymbol("ILS")}
            labelLine={false}
          >
            {data.map((obj: any, i: number) => (
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
