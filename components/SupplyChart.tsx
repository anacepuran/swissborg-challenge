import { pieChartOptions } from "@/utils/pieChartConfiguration";
import { PieChartData } from "@/utils/types";
import * as Highcharts from "highcharts/highcharts";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface SupplyChartProps {
  chartData: PieChartData[] | undefined;
}

export const SupplyChart: React.FC<SupplyChartProps> = ({ chartData }) => {
  if (!chartData) return <div className="loader-chart" />;

  const options = {
    series: [
      {
        data: chartData,
        dataLabels: {
          useHTML: true,
          style: { fontWeight: "normal" },
          connectorWidth: 0,
          distance: 0,
        },
      },
    ],
    ...pieChartOptions,
  };

  return (
    <div id="container" className="pie-chart-wrapper lg:ml-12">
      <PieChart
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: { height: "auto", width: "100%" },
        }}
      />
    </div>
  );
};
