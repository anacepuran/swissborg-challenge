import { useState } from "react";
import { HistoricalPeriod, Price } from "../utils/types";
import { HistoricalChart } from "./HistoricalChart";
import PriceInformation from "./PriceInformation";

interface BorgMetricsProps {
  priceInformation: Record<string, Price> | undefined;
}

export default function BorgMetrics({ priceInformation }: BorgMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>("day");

  const handlePeriodSelection = async (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
  };

  return (
    <div className="chart-card">
      <div className="historical-chart-header">
        <PriceInformation priceInformation={priceInformation} />
      </div>
      <div className="separator" />
      <HistoricalChart selectedPeriod={selectedPeriod} />
      {/* PERIOD SELECTION BUTTONS */}
      <div className="grid grid-cols-4 w-full">
        <button
          key={"day"}
          onClick={() => handlePeriodSelection("day")}
          className={`historical-chart-button button-first ${
            selectedPeriod === "day" && "button-selected"
          }`}>
          1D
        </button>
        <button
          key={"month"}
          onClick={() => handlePeriodSelection("month")}
          className={`historical-chart-button ${
            selectedPeriod === "month" && "button-selected"
          }`}>
          1M
        </button>
        <button
          key={"year"}
          onClick={() => handlePeriodSelection("year")}
          className={`historical-chart-button ${
            selectedPeriod === "year" && "button-selected"
          }`}>
          1Y
        </button>
        <button
          key={"all"}
          onClick={() => handlePeriodSelection("all")}
          className={`historical-chart-button button-last ${
            selectedPeriod === "all" && "button-selected"
          }`}>
          ALL
        </button>
      </div>
    </div>
  );
}
