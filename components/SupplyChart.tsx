"use client";
import { getSupplyChartOptions } from "@/utils/chartConfiguration";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats } from "@/utils/types";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MyComponentProps {
  stats: BorgStats | null;
}

export const SupplyChart: React.FC<MyComponentProps> = ({ stats }) => {
  const series = useMemo(() => {
    const seriesComputed = stats
      ? STATS_TO_DISPLAY.map((stat) => stats[stat.attrName + "Tokens"])
      : [];
    const labelsComputed = stats
      ? STATS_TO_DISPLAY.map((stat) => stat.chartLabel)
      : [];
    return { series: seriesComputed, labels: labelsComputed };
  }, [stats]);

  const chartOptions = useMemo(() => {
    return getSupplyChartOptions(series);
  }, [series]);

  if (!stats) return;

  return (
    <div className="supply-chart-wrapper" id="chart">
      <ApexChart
        type="donut"
        options={chartOptions}
        series={chartOptions.series}
        height={320}
      />
    </div>
  );
};
