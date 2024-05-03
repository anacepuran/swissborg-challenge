import { useEffect, useState } from "react";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import { HistoricalPeriod, HistoricalPricePeriod, Price } from "../utils/types";
import { HistoricalChart } from "./HistoricalChart";
import PriceInformation from "./PriceInformation";

interface MetricsProps {
  chartData: number[][] | undefined;
  priceInformation: Record<string, Price> | undefined;
}

export default function BorgMetrics({
  chartData,
  priceInformation,
}: MetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod>("day");

  const [historicalData, setHistoricalData] = useState<{
    [key: string]: number[][];
  }>({});

  useEffect(() => {
    if (chartData) {
      setHistoricalData((prevData) => ({ ...prevData, day: chartData }));
    }
  }, [chartData]);

  const fetchHistoricalData = async (
    period: HistoricalPeriod
  ): Promise<number[][]> => {
    const response = await fetch(
      `https://borg-api-techchallenge.swissborg-stage.com/api/historical-price/${period}`
    );
    const data: HistoricalPricePeriod = await response.json();
    const formattedChartData: number[][] =
      data
        ?.filter((_, index) => index % 10 === 0)
        .map((item) => [new Date(item.timestamp).getTime(), item.price]) ?? [];
    return formattedChartData;
  };

  const handlePeriodSelection = async (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
    try {
      const response = await fetchHistoricalData(selected);
      setHistoricalData((prevData) => ({ ...prevData, [selected]: response }));
    } catch (e) {
      console.error("Error fetching historical data:", e);
    }
  };

  return (
    <div className="historical-chart-wrapper">
      <PriceInformation priceInformation={priceInformation} />
      <div className="flex items-center" style={{ height: "240px" }}>
        {!chartData ? (
          <div className="loader-chart" />
        ) : (
          <HistoricalChart
            reducedData={historicalData[selectedPeriod] ?? chartData}
          />
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
