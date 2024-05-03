import { PieChartData } from "@/utils/types";
import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import React from "react";

interface SupplyChartProps {
  chartData: PieChartData[] | undefined;
}

export const SupplyChart: React.FC<SupplyChartProps> = ({ chartData }) => {
  if (!chartData) return <div className="loader-chart" />;

  const options = {
    title: "",
    chart: {
      type: "pie",
      renderTo: "container",
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "normal",
        fontSize: "18px",
      },
      margin: [0, 0, 0, 0],
    },
    plotOptions: {
      series: {
        animation: false,
        borderWidth: 0,
        enableMouseTracking: false,
      },
      pie: {
        innerSize: "70%",
        borderRadius: 0,
        startAngle: 80,
      },
    },
    series: [
      {
        data: chartData,
        dataLabels: {
          useHTML: true,
          style: { fontWeight: "normal" },
          connectorWidth: 0,
          distance: 4,
        },
      },
    ],
  };

  return (
    <div id="container" className="supply-chart-wrapper">
      <PieChart
        highcharts={Highcharts}
        options={options}
        // containerProps={{ style: { height: "auto", width: "100%" } }}
      />
    </div>
  );
};
