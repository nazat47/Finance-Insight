import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPrediction, setIsPrediction] = useState(false);
  const { data: kpiData } = useGetKpisQuery();
  const filteredData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;
    const filtered: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(filtered);
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual revenue": revenue,
        "Regression line": regressionLine.points[i][1],
        "Predicted line": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);
  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Charted revenue and predicted revenue based on linear regression
            model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPrediction(!isPrediction)}
          sx={{
            color: palette.grey[300],
            bgcolor: palette.grey[700],
            boxShadow: "1rem rgba(0,0,0,0.4)",
          }}
        >
          Show prediction for next year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData}
          margin={{
            top: 20,
            right: 70,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
            domain={[12000,30000]}
          >
            <Label
              value="Revenue in BDT"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression line"
            stroke="#8884d8"
            dot={false}
          />
          {isPrediction && (
            <Line strokeDasharray='5 5' dataKey="Predicted line" stroke="#8884d8" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
