import { getSupplyChartOptions } from "@/utils/chartConfiguration";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats } from "@/utils/types";
import React, { useMemo } from "react";
// const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MyComponentProps {
  stats: BorgStats | null;
}

export const SupplyChart: React.FC<MyComponentProps> = ({ stats }) => {
  const series = useMemo(() => {
    return stats
      ? STATS_TO_DISPLAY.map((stat) => stats[stat.attrName + "Tokens"])
      : [];
  }, [stats]);
  const labels = useMemo(() => {
    return stats ? STATS_TO_DISPLAY.map((stat) => stat.chartLabel) : [];
  }, [stats]);

  const chartOptions = useMemo(
    () => getSupplyChartOptions(series, labels),
    [labels, series]
  );

  if (!stats) return;

  return (
    <div className="supply-chart-wrapper" id="chart">
      {/* <ApexChart
        type="donut"
        series={chartOptions.series}
        options={chartOptions}
        height={320}
      /> */}
    </div>
  );
};
