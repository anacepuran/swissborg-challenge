import { ChartData } from "@/utils/types";
import Highcharts from "highcharts";
import AreaChart from "highcharts-react-official";

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
      backgroundColor: "rgba(25, 30, 41, 0.9)",
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "normal",
        fontSize: "14px",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      type: "datetime",
      dateTimeLabelFormats: {
        hour: "%H:%M",
        minute: "%H:%M",
        day: "%H:00",
        // day: "%d %b",
        month: "%b %y",
        year: "%b %y",
      },
      crosshair: {
        dashStyle: "Dash",
        width: 0.5,
      },
      labels: {
        reserveSpace: false,
        y: 5,
        overflow: "justify",
        style: {
          color: "#FFF",
        },
      },
      tickWidth: 0,
      minTickInterval: 4 * 3600 * 1000,
    },
    yAxis: {
      minPadding: 0,
      maxPadding: 0,
      minMargin: 0,
      maxMargin: 0,
      title: "",
      gridLineWidth: 0.5,
      opposite: true,
      labels: {
        reserveSpace: false,
        overflow: "justify",
        x: -10,
        style: {
          color: "#FFF",
        },
      },
      tickWidth: 0,
    },
    legend: { enabled: false },
    plotOptions: {
      area: {
        animation: false,
        color: "#01C38D",
        fillColor: {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, "rgba(255, 255, 255, 0)"],
            [1, "rgba(1, 195, 141, .5)"],
          ],
        },
        lineWidth: 1,
      },
    },
    series: [
      {
        type: "area",
        name: "USD to BORG",
        data: reducedData,
        boostThreshold: 1,
      },
    ],
    // responsive: {
    //   rules: [
    //     {
    //       condition: {
    //         maxWidth: 600,
    //       },
    //       chartOptions: {
    //         chart: { width: 300 },
    //       },
    //     },
    //   ],
    // },
  };
  return (
    <div>
      <AreaChart highcharts={Highcharts} options={options} />
    </div>
  );
}
