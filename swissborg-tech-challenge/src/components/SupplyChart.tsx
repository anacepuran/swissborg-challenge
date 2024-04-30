"use client";
import { STATS_TO_DISPLAY } from "@/config";
import { BorgStats } from "@/types";
import { formatNumberWithCommas } from "@/utils";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import styled from "styled-components";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MyComponentProps {
  stats: BorgStats | null;
}

const SupplyChart: React.FC<MyComponentProps> = ({ stats }) => {
  const series = useMemo(() => {
    const seriesComputed = stats
      ? STATS_TO_DISPLAY.map((stat) => stats[stat.attrName + "Tokens"])
      : [];
    const labelsComputed = stats
      ? STATS_TO_DISPLAY.map((stat) => stat.chartLabel)
      : [];
    return { series: seriesComputed, labels: labelsComputed };
  }, [stats]);

  const chartOptions = {
    chart: {
      type: "donut",
      fontFamily: "TT Commons, sans-serif",
      foreColor: "black",
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 2,
        left: -2,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      zoom: { enabled: false },
    },
    stroke: {
      width: 0,
    },
    grid: {
      show: true,
      borderColor: "rgba(255,255,255,0.1)",
      position: "back",
      padding: {
        left: -5,
        right: -5,
      },
    },
    series: series.series,
    labels: series.labels,
    tooltip: {
      theme: "light", // Set tooltip theme
      y: {
        formatter: function (val) {
          return formatNumberWithCommas(val);
        },
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return series.labels[opts["seriesIndex"]];
      },
      style: {
        // fontSize: "14px",
        fontWeight: 100,
        colors: ["black"],
      },
    },
    colors: [
      "rgba(204, 243, 232, 1)",
      "rgba(19, 229, 191, 1)",
      "rgba(173, 149, 255, 1)",
      "rgba(54, 64, 83, 1)",
      "rgba(122, 188, 255, 1)",
    ],
    legend: { show: false },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: "70%",
        },
        dataLabels: {
          minAngleToShowLabel: 0.1,
          offset: 30,
        },
      },
    },

    annotations: {
      points: [
        {
          x: 20,
          y: 20,
          label: {
            text: "IMPORTANT",
            borderColor: "red",
            offsetY: 0,
          },
        },
      ],
    },
  } as ApexOptions;

  function extractPosition(pathData: string) {
    // Use regular expressions to match coordinate pairs
    const regex =
      /M\s*(-?\d*\.?\d+)\s*(-?\d*\.?\d+)\s*A.*?\s*(-?\d*\.?\d+)\s*(-?\d*\.?\d+)\s*(\d+)\s*(\d)\s*L\s*(-?\d*\.?\d+)\s*(-?\d*\.?\d+)/;

    // Match the regex pattern against the path data
    const match = pathData.match(regex);

    if (!match) {
      console.error("Invalid path data format");
      return null;
    }

    // Extract the coordinates from the matched groups
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    const endX = parseFloat(match[7]);
    const endY = parseFloat(match[8]);

    // Calculate the midpoint coordinates
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Return the midpoint coordinates as an object
    return { midX, midY };
  }

  //   useEffect(() => {
  //     const pieSliceElements = document.querySelectorAll(".apexcharts-pie-area");
  //     pieSliceElements.forEach((sliceElement, index) => {
  //       const fillColor = sliceElement.getAttribute("fill");
  //       const pathData = sliceElement.getAttribute("d");

  //       //   console.log(`Pie Slice ${index + 1}`);
  //       //   console.log(`Fill Color: ${fillColor}`);
  //       //   console.log(`Position: ${pathData}`);

  //       const customLabelExp = document.createElement("div");
  //       const positionData = extractPosition(pathData ?? "") ?? {
  //         midX: 0,
  //         midY: 0,
  //       };
  //       const chartAreaOffset = document
  //         .getElementById("chart")
  //         ?.getBoundingClientRect();

  //       if (!chartAreaOffset) return;

  //       const labelLeft = 0;
  //       const labelTop = 0;
  //       customLabelExp.style.position = "relative";
  //       customLabelExp.style.width = "20px";
  //       customLabelExp.style.height = "20px";
  //       customLabelExp.style.borderRadius = "10px";
  //       customLabelExp.style.backgroundColor = `${fillColor}`;
  //       customLabelExp.style.left = `${positionData?.midX * 1.2}px`; // Adjust as needed
  //       customLabelExp.style.top = `${positionData?.midY * 1.6}px`; // Adjust as needed
  //       //   customLabelExp.style.left = `${labelLeft}px`;
  //       //   customLabelExp.style.top = `${labelTop}px`;

  //       document.getElementById("chart")?.appendChild(customLabelExp);

  //       //   document.body.appendChild(customLabelExp);
  //     });
  //   }, [chartOptions.series, series.labels]);

  if (!stats) return;
  return (
    <ChartWrapper id="chart">
      <ApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
        height={240}
        // width={"100%"}
      />
    </ChartWrapper>
  );
};

export default SupplyChart;
const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  //   background: black;
  width: 100%;
  height: 100%;
  position: relative;
`;
const StyledCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 10px;
`;
