import { useFetchHistoricalPriceData } from "@/api/fetch";
import { useEffect, useState } from "react";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import { HistoricalPeriod } from "../utils/types";
import { HistoricalChart } from "./HistoricalChart";
import PriceInformation from "./PriceInformation";

interface MetricsProps {
  chartData: number[][] | undefined;
}

export default function BorgMetrics({ chartData }: MetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>("day");
  const handlePeriodSelection = (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
  };

  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (firstLoad && chartData) {
      console.log("*** CACHE ***");
      localStorage.setItem(
        `historical-price/${selectedPeriod}`,
        JSON.stringify({ series: chartData })
      );
      setFirstLoad(false);
    }
  }, [firstLoad]);

  const { data: historicalChartData } = useFetchHistoricalPriceData(
    `historical-price/${selectedPeriod}`
  );

  useEffect(() => {
    localStorage.setItem(
      `historical-price/${selectedPeriod}`,
      JSON.stringify({ series: historicalChartData })
    );
  }, [historicalChartData]);

  return (
    <div className="historical-chart-wrapper">
      <PriceInformation />
      <div className="flex items-center" style={{ height: "240px" }}>
        {!chartData ? (
          <div className="loader-chart" />
        ) : (
          <HistoricalChart reducedData={historicalChartData} />
        )}
      </div>
      <div className="grid grid-cols-4 w-full">
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
function useFetchHistoricalData<T>(arg0: string): { data: any } {
  throw new Error("Function not implemented.");
}
