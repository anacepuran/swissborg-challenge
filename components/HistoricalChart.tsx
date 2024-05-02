import { ChartData } from "@/utils/types";
import Highcharts from "highcharts";
import AreaChart from "highcharts-react-official";
import Boost from "highcharts/modules/boost";

if (typeof Highcharts === "object") {
  Boost(Highcharts);
}

interface HistoricalChartProps {
  reducedData: ChartData[];
}
export function HistoricalChart({ reducedData }: HistoricalChartProps) {
  const options = {
    title: "",
    chart: {
      type: "area",
      height: 180,
      width: 520,
      animation: false,
    },
    xAxis: {
      type: "datetime",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        animation: false,
        color: "#01C38D",
        fillColor: {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, "rgba(255, 255, 255, 0)"],
            [1, "#01C38D"],
          ],
        },
      },
    },
    series: [
      {
        type: "area",
        name: "USD to BORG",
        data: reducedData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            chart: { width: 300 },
          },
        },
      ],
    },
  };
  return (
    <div>
      <AreaChart highcharts={Highcharts} options={options} />
    </div>
  );
}
