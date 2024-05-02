import { PieChartData } from "@/utils/types";
import Highcharts from "highcharts";
// import PieChart from "highcharts-react-official";
import dynamic from "next/dynamic";
import React from "react";
const PieChart = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface SupplyChartProps {
  stats: PieChartData[];
}

export const SupplyChart: React.FC<SupplyChartProps> = ({ stats }) => {
  const options = {
    title: "",
    chart: {
      type: "pie",
    },
    plotOptions: {
      series: {
        animation: false,
        borderWidth: 0,
      },
      pie: { innerSize: "80%", borderRadius: 0 },
    },
    series: [
      {
        data: stats,
      },
    ],
  };

  if (!stats) return;

  return (
    <div className="supply-chart-wrapper" id="chart">
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  );
};
