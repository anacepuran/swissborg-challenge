import { HistoricalPricePeriod } from "@/utils/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
type ChartData = {
  reducedData: HistoricalPricePeriod;
};
export function AreaChart({ reducedData }: ChartData) {
  //   console.log(reducedData);
  const formattedChartData = useMemo(() => {
    const data = reducedData?.map((item) => [
      new Date(item.timestamp).getTime(),
      item.price,
    ]);
    return data;
  }, [reducedData]);

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
        data: formattedChartData,
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
