import { getCustomTooltip } from "./utils";

export function getAreaChartConfig(min: number, max: number) {
  return {
    title: "",
    credits: { enabled: false },
    chart: {
      type: "area",
      backgroundColor: "rgba(25, 30, 41, 0.9)",
      margin: [10, -5, 15, -5],
      animation: true,
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "normal",
        fontSize: "14px",
      },
    },
    xAxis: {
      type: "datetime",
      tickAmount: 5,
      showFirstLabel: false,
      tickWidth: 0,
      crosshair: {
        dashStyle: "dash",
        width: 0.5,
      },
      labels: {
        y: 5,
        style: { color: "#FFF" },
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      max: max,
      min: min,
      tickAmount: 5,
      showFirstLabel: false,
      opposite: true,
      labels: {
        x: -32,
        style: { color: "#FFF" },
      },
      gridLineColor: "rgba(255,255,255,0.2)",
      gridLineWidth: 0.5,
    },
    legend: { enabled: false },
    tooltip: {
      useHTML: true,
      formatter(this: Highcharts.TooltipFormatterContextObject) {
        return getCustomTooltip(this.point.y, this.point.category);
      },
      backgroundColor: "rgb(25, 30, 41)",
      style: { color: "#fff" },
      animation: false,
    },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    navigator: { enabled: false },
    plotOptions: {
      area: {
        animation: false,
        color: "#01C38D",
        lineWidth: 1,
        fillColor: {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, "rgba(255, 255, 255, 0)"],
            [1, "rgba(1, 195, 141, .32)"],
          ],
        },
      },
    },
  };
}
