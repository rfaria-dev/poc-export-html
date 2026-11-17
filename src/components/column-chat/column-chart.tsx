import { BarChart } from "@mui/x-charts";

interface ColumnChartProps {
  categories: string[];
  data: number[];
  height?: number;
}

export const ColumnChart = ({
  categories,
  data,
  height = 300,
}: ColumnChartProps) => {
  const maxValue = Math.max(...data, 0);

  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: categories,
          scaleType: "band",
          height: 28,
          categoryGapRatio: 0.3,
          barGapRatio: 0.2,
        },
      ]}
      yAxis={[
        {
          min: 0,
          max: maxValue > 0 ? maxValue * 1.2 : 10,
        },
      ]}
      series={[
        {
          data,
          label: "Valores",
        },
      ]}
      height={height}
      margin={{
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      }}
      sx={{
        width: "100%",
      }}
    />
  );
};
