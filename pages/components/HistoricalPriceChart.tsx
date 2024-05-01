import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getHistoricalChartOptions } from "../../utils/chartConfiguration";
import { HISTORICAL_PERIOD_OPTIONS } from "../../utils/configuration";
import { HistoricalPricePeriod, Price } from "../../utils/types";
import { getPriceColor } from "../../utils/utils";
import { getHistoricalData, getPriceInformation } from "../api/getters";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HistoricalPriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [priceInformation, setPriceInformation] = useState<Price | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await getPriceInformation();
      setPriceInformation(res["usd"]);
    };
    fetchDataAsync();
  }, []);

  const [historicalPriceData, setHistoricalPriceData] =
    useState<HistoricalPricePeriod | null>(null);

  const handlePeriodSelection = (selected: string) => {
    setSelectedPeriod(selected);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await getHistoricalData(selectedPeriod);
      setHistoricalPriceData(res);
    };
    fetchDataAsync();
  }, [selectedPeriod]);

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

  if (!historicalPriceData || !priceInformation) return;

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
            <p>USD {priceInformation.price.toFixed(3)}</p>
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
