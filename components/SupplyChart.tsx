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
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "normal",
        fontSize: "18px",
      },
    },
    plotOptions: {
      series: {
        animation: false,
        borderWidth: 0,
        enableMouseTracking: false,
      },
      pie: { innerSize: "80%", borderRadius: 0, size: "100%" },
    },
    series: [
      {
        data: chartData,
        dataLabels: {
          useHTML: true,
          distance: 10,
          connectorWidth: 0,
          style: {
            fontWeight: "normal",
          },
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            chart: {
              marginRight: 10,
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  distance: 5,
                },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart" className="supply-chart-wrapper">
      <PieChart
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
};
