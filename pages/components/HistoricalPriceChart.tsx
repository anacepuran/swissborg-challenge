import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getHistoricalChartOptions } from "../../utils/chartConfiguration";
import { HISTORICAL_PERIOD_OPTIONS } from "../../utils/configuration";
import { HistoricalPricePeriod, Price } from "../../utils/types";
import { getPriceColor } from "../../utils/utils";
import { useFetchData } from "../api/fetch";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HistoricalPriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");

  const {
    data: historicalPriceData,
    loading,
    error,
  } = useFetchData<HistoricalPricePeriod>("historical-price/" + selectedPeriod);

  const {
    data: priceInformation,
    loading: informationLoading,
    error: informationError,
  } = useFetchData<Price>("price");

  const data = useMemo(() => {
    console.log(historicalPriceData);
    console.log(priceInformation);
  }, [historicalPriceData, priceInformation]);

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

  if (!series || !priceInformation) return;

  return (
    <div className="historical-chart-wrapper">
      <div className="historical-chart-header flex gap-3">
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={32}
          height={32}
          style={{ width: "4rem", height: "auto" }}
        />
        {priceInformation && (
          <div className="font-light text-left">
            <p>USD {priceInformation?.price?.toFixed(3)}</p>
            <p
              className="text-primary text-sm"
              style={{ color: getPriceColor(priceInformation?.change24h) }}>
              {priceInformation.change24h}%{" "}
              <span className="text-primary">24 Hours</span>
            </p>
          </div>
        )}
      </div>
      <div className="separator" />
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
