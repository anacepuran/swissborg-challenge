import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { getHistoricalChartOptions } from "../../utils/chartConfiguration";
import { HISTORICAL_PERIOD_OPTIONS } from "../../utils/configuration";
import { HistoricalPricePeriod } from "../../utils/types";
import { useFetchData } from "../api/fetch";
import PriceInformation from "./PriceInformation";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

  const series = useMemo(() => {
    const reducedData = historicalPriceData?.filter((item, i) => i % 10 === 0);
    return {
      series: reducedData?.map((price) => price.price) ?? [],
      categories: reducedData?.map((price) => price.timestamp),
    };
  }, [historicalPriceData]);

  const chartOptions = useMemo(() => {
    if (!series) return {};
    return getHistoricalChartOptions(series.series, series.categories);
  }, [series]);

  if (!series) return;

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
