import { HistoricalPricePeriod } from "@/utils/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
type ChartData = {
  reducedData: HistoricalPricePeriod;
};
export function AreaChart({ reducedData }: ChartData) {
  console.log(reducedData);
  const formattedChartData = useMemo(() => {
    const data = reducedData?.map((item) => [
      new Date(item.timestamp).getTime(),
      item.price,
    ]);
    return data;
  }, [reducedData]);

  const options = {
    chart: {
      type: "area",
      height: 180,
      width: 520,
      animation: false,
    },
    title: "",
    xAxis: {
      type: "datetime",
    },
    legend: {
      enabled: false,
    },
    // plotOptions: {
    //   area: {
    //     fillColor: {
    //       linearGradient: {},
    //     },
    //   },
    // },
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
  } as Highcharts.Options;
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
