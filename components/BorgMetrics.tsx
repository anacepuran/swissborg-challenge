import { useState } from "react";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import { HistoricalPeriod, Price } from "../utils/types";
import { HistoricalChart } from "./HistoricalChart";
import PriceInformation from "./PriceInformation";

interface MetricsProps {
  chartData: number[][];
  priceInfo: Record<string, Price> | undefined;
}

export default function BorgMetrics({ chartData, priceInfo }: MetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>("day");
  const handlePeriodSelection = (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
  };

  return (
    <div className="historical-chart-wrapper">
      {priceInfo && <PriceInformation priceInformation={priceInfo} />}
      <div className="flex items-center" style={{ height: "240px" }}>
        {!chartData ? (
          <div className="loader-chart" />
        ) : (
          <HistoricalChart reducedData={chartData} />
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
