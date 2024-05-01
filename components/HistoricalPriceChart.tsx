import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useFetchData } from "../api/fetch";
import { getHistoricalChartOptions } from "../utils/chartConfiguration";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import { HistoricalPrice, HistoricalPricePeriod } from "../utils/types";
import PriceInformation from "./PriceInformation";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartData = {
  series: number[];
  categories: string[];
};

export default function HistoricalPriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");

  const {
    data: historicalPriceData,
    loading,
    error,
  } = useFetchData<HistoricalPricePeriod>("historical-price/" + selectedPeriod);

  const handlePeriodSelection = (selected: string) => {
    setSelectedPeriod(selected);
  };

  // Assuming historicalPriceData is an array of HistoricalPrice objects
  const chartData: ChartData = useMemo(() => {
    const reducedData =
      historicalPriceData?.filter((_, i) => i % 10 === 0) ?? [];
    const [series, categories] = reducedData.reduce(
      ([series, categories], { price, timestamp }: HistoricalPrice) => {
        series.push(price);
        categories.push(timestamp);
        return [series, categories];
      },
      [[], []] as [number[], string[]] // Specify initial values and types for destructuring
    );
    return { series, categories };
  }, [historicalPriceData]);

  const chartOptions = useMemo(() => {
    if (!chartData) return {};
    return getHistoricalChartOptions(chartData.series, chartData.categories);
  }, [chartData]);

  if (!chartData) return;

  return (
    <div className="historical-chart-wrapper">
      <PriceInformation />
      <ApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="area"
        height={140}
        width={520}
      />
      <div className="grid w-full max-w-5xl grid-cols-4 text-center font-light">
        {HISTORICAL_PERIOD_OPTIONS.map((option, index) => {
          return (
            <button
              className={`historical-chart-button ${
                option.name === selectedPeriod && "button-selected"
              } ${index === 0 && "button-first"} ${
                index === 3 && "button-last"
              }`}
              key={option.displayName}
              onClick={() => handlePeriodSelection(option.name)}>
              {option.displayName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
