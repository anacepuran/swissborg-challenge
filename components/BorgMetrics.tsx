import { useMemo, useState } from "react";
import { HISTORICAL_PERIOD_OPTIONS } from "../utils/configuration";
import { HistoricalPeriod, Price } from "../utils/types";
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

  const historicalChartData = useMemo(() => {
    return chartData;
  }, [chartData]);

  // const { data: historicalChartData } = useFetchHistoricalPriceData(
  //   `historical-price/${selectedPeriod}`
  // );

  const handlePeriodSelection = (selected: HistoricalPeriod) => {
    setSelectedPeriod(selected);
  };

  // useEffect(() => {
  //   if (historicalChartData) {
  //     sessionStorage.setItem(
  //       `historical-price/${selectedPeriod}`,
  //       JSON.stringify({ series: historicalChartData })
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [historicalChartData]);

  return (
    <div className="historical-chart-wrapper">
      <PriceInformation priceInformation={priceInformation} />
      <div className="flex items-center" style={{ height: "240px" }}>
        {!historicalChartData ? (
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
