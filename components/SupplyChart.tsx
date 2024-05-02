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
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "light",
        fontSize: "18px",
      },
    },
    plotOptions: {
      series: {
        animation: false,
        borderWidth: 0,
      },
      pie: { innerSize: "80%", borderRadius: 0, size: "85%" },
    },
    series: [
      {
        data: stats,
        dataLabels: {
          useHTML: true,
          distance: 10,
          connectorWidth: 0,
        },
      },
    ],
  };

  if (!stats) return;

  return (
    <div id="chart" className="supply-chart-wrapper">
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  );
};
