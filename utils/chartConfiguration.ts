import { ApexOptions } from "apexcharts";

export function getHistoricalChartOptions(
  series: number[],
  xaxisCategories: string[] | undefined
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
      animations: {
        enabled: false,
      },
    },
    series: [
      {
        name: "USD to BORG",
        data: series,
      },
    ],

    markers: {
      size: 0,
    },
    dataLabels: { enabled: false },

    xaxis: {
      type: "datetime",
      crosshairs: {
        show: true,
        stroke: {
          color: "#888", // Customize the color of the crosshair line
          width: 1, // Customize the width of the crosshair line
          dashArray: 0, // Disable dash array
        },
        position: "back",
      },
      categories: xaxisCategories,
      position: "bottom",
      floating: false,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { fontWeight: 100, fontSize: "11px" },
      },
      tickAmount: 5,
      // tooltip: {
      //   // enabled: false,
      //   formatter: function (val, opts) {
      //     return val + "...";
      //   },
      //   style: {
      //     fontSize: "10px",
      //   },
      // },
    },
    yaxis: {
      floating: true,
      axisBorder: { show: false },
      axisTicks: { show: false },
      opposite: true,
      decimalsInFloat: 2,
      tickAmount: 5,
      labels: { offsetX: 40, style: { fontWeight: 100, fontSize: "11px" } },
    },

    tooltip: {
      theme: "dark", // Set tooltip theme
      marker: { show: false },
      x: { format: "dd MMM yyyy" },
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
      lineCap: "round",
      width: 1,
    },

    grid: {
      show: true,
      borderColor: "rgba(255,255,255,.05)",
      padding: {
        left: -5,
        right: -5,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 300,
          },
        },
      },
      // {
      //   breakpoint: 600,
      //   options: {
      //     chart: {
      //       width: 400,
      //     },
      //   },
      // },
      // {
      //   breakpoint: 600,
      //   options: {
      //     chart: {
      //       width: 400,
      //     },
      //   },
      // },
    ],
  };
}
