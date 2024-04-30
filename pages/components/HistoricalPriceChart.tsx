import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
      console.log(res);
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

  if (!historicalPriceData) return;

  return (
    <ChartWrapper>
      <ChartHeader className="flex gap-3">
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={40}
          height={40}
          style={{ width: "4rem", height: "auto" }}
        />
        {priceInformation && (
          <div className="font-light text-left">
            <p>USD {priceInformation.price}</p>
            <p
              className="text-primary text-sm"
              style={{ color: getPriceColor(priceInformation?.change24h) }}>
              {priceInformation.change24h}%{" "}
              <span className="text-primary">24 Hours</span>
            </p>
          </div>
        )}
      </ChartHeader>
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
            <StyledButton
              key={option.displayName}
              $index={index}
              $isActive={option.name === selectedPeriod}
              onClick={() => handlePeriodSelection(option.name)}>
              {option.displayName}
            </StyledButton>
          );
        })}
      </div>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  background-color: rgba(25, 30, 41, 0.9);
  border-radius: 10px;
  box-shadow: -4px 6px 10px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button<{ $isActive: boolean; $index: number }>`
  width: 100%;
  height: 1.6rem;
  font-size: 12px;

  background-color: ${({ $isActive }) =>
    $isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};

  color: ${({ $isActive }) => ($isActive ? "#01c38d" : "white")};

  border-radius: ${({ $index }) =>
    $index === 0 ? "0 0 0 10px" : $index === 3 ? "0 0 10px 0" : "0"};

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    color: #01c38d;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.25);
    color: #01c38d;
  }
`;

const Separator = styled.div``;

const ChartHeader = styled.div`
  width: 100%;
  padding: 1rem 1rem 0.6rem 0.6rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px 10px 0 0;
`;
