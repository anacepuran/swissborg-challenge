import { ApexOptions } from "apexcharts";
import { HistoricalPeriod } from "./types";
import { getDateFormat } from "./utils";

export function getHistoricalChartOptions(
  series: number[],
  xaxisCategories: string[] | undefined,
  selectedPeriod: HistoricalPeriod
): ApexOptions {
  return {
    chart: {
      id: "historical-price-chart",
      type: "area",
      fontFamily: "TT Commons, sans-serif",
      foreColor: "white",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "rgba(25, 30, 41, 0.9)",
      animations: { enabled: false },
    },
    series: [
      {
        name: "USD to BORG",
        data: series,
      },
    ],
    dataLabels: { enabled: false },
    noData: {
      text: "No data to display.",
      offsetY: -10,
    },
    xaxis: {
      type: "datetime",
      categories: xaxisCategories,
      crosshairs: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickPlacement: "between",
      floating: true,
      tooltip: { enabled: false },
      labels: {
        style: { fontWeight: 100, fontSize: "11px" },
        format: getDateFormat(selectedPeriod, true), // Chartview format
        offsetY: -10,
      },
    },
    yaxis: {
      floating: true,
      axisBorder: { show: false },
      axisTicks: { show: false },
      opposite: true,
      decimalsInFloat: 2,
      tickAmount: 5,
      labels: { offsetX: 36, offsetY: -6, style: { fontWeight: "bold" } },
    },
    tooltip: {
      theme: "dark",
      marker: { show: false },
      x: { format: getDateFormat(selectedPeriod) },
    },
    fill: {
      colors: ["#01C38D"],
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    stroke: {
      colors: ["rgba(1, 195, 141, 1)"],
      curve: "smooth",
      width: 1,
    },
    grid: {
      show: true,
      borderColor: "rgba(255,255,255,.05)",
      padding: { left: -5, right: -5 },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { width: 300 },
        },
      },
    ],
  };
}

export function getSupplyChartOptions(series: number[], labels: string[]) {
  return {
    chart: {
      type: "donut",
      fontFamily: "TT Commons, sans-serif",
      toolbar: { show: false },
      dropShadow: { enabled: true, opacity: 0.2 },
      animations: { enabled: false },
    },
    series: series,
    labels: labels,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: { size: "68%" },
      },
    },
    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },
    legend: { show: true, position: "bottom" },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    colors: [
      "rgba(204, 243, 232, 1)",
      "rgba(19, 229, 191, 1)",
      "rgba(173, 149, 255, 1)",
      "rgba(54, 64, 83, 1)",
      "rgba(122, 188, 255, 1)",
    ],
  } as ApexOptions;
}
