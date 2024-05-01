import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useFetchData } from "../api/fetch";
import { getHistoricalChartOptions } from "../utils/chartConfiguration";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import {
  HistoricalPeriod,
  HistoricalPrice,
  HistoricalPricePeriod,
} from "../utils/types";
import PriceInformation from "./PriceInformation";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartData = {
  series: number[];
  categories: string[];
};

export default function HistoricalPriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>("day");
  const { data: historicalPriceData } = useFetchData<HistoricalPricePeriod>(
    "historical-price/" + selectedPeriod,
    true // Cache enabled
  );

  const handlePeriodSelection = (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
  };

  const reducedData = useMemo(
    () => historicalPriceData?.filter((_, i) => i % 10 === 0) ?? [],
    [historicalPriceData]
  );

  const chartData: ChartData = useMemo(() => {
    const [series, categories] = reducedData.reduce(
      ([series, categories], { price, timestamp }: HistoricalPrice) => {
        series.push(price);
        categories.push(timestamp);
        return [series, categories];
      },
      [[], []] as [number[], string[]]
    );
    return { series, categories };
  }, [reducedData]);

  const chartOptions = useMemo(() => {
    if (!chartData) return {};
    return getHistoricalChartOptions(
      chartData.series,
      chartData.categories,
      selectedPeriod
    );
  }, [chartData]);

  if (!chartData) return;

  return (
    <div className="historical-chart-wrapper">
      <PriceInformation />
      <ApexChart
        type="area"
        series={chartOptions.series}
        options={chartOptions}
        height={140}
        width={520}
      />
      <div className="grid w-full max-w-5xl grid-cols-4 text-center font-light">
        {HISTORICAL_PERIOD_OPTIONS.map((option, index) => {
          return (
            <button
              key={option.displayName}
              onClick={() => handlePeriodSelection(option.name)}
              className={`historical-chart-button ${
                option.name === selectedPeriod && "button-selected"
              } ${index === 0 && "button-first"} ${
                index === 3 && "button-last"
              }`}>
              {option.displayName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
