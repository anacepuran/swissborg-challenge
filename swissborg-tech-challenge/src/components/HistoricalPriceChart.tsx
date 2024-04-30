"use client";
import { HistoricalPeriod, HistoricalPricePeriod, Price } from "@/types";
import { getHistoricalData, getPriceInformation } from "@/utils/fetch";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MyComponentProps {}

const HISTORICAL_PERIOD_OPTIONS: {
  name: HistoricalPeriod;
  displayName: string;
}[] = [
  {
    name: "day",
    displayName: "1D",
  },
  {
    name: "month",
    displayName: "1M",
  },
  {
    name: "year",
    displayName: "1Y",
  },
  {
    name: "all",
    displayName: "ALL",
  },
];

const HistoricalPriceChart: React.FC<MyComponentProps> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [priceInformation, setPriceInformation] = useState<Price | null>(null);
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

  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await getPriceInformation();
      setPriceInformation(res["usd"]);
    };
    fetchDataAsync();
  }, []);

  const series = useMemo(() => {
    const reducedData = historicalPriceData?.filter(function (item, index) {
      return index % 10 === 0;
    });
    return reducedData?.map((price) => price.price) ?? [];
  }, [historicalPriceData]);

  const xAxisCategories = useMemo(() => {
    const reducedData = historicalPriceData?.filter(function (item, index) {
      return index % 10 === 0;
    });
    return reducedData?.map((price) => price.timestamp);
  }, [historicalPriceData]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "historical-price-chart",
      type: "area",
      fontFamily: "TT Commons, sans-serif",
      foreColor: "white",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "rgba(25, 30, 41, 0.9)",
    },
    series: [
      {
        name: "USD to BORG",
        data: series,
      },
    ],
    markers: {
      size: 0,
    },
    dataLabels: { enabled: false },

    xaxis: {
      type: "datetime",
      crosshairs: {
        show: true,
        stroke: {
          color: "#888", // Customize the color of the crosshair line
          width: 1, // Customize the width of the crosshair line
          dashArray: 0, // Disable dash array
        },
        position: "back",
      },
      categories: xAxisCategories,
      position: "bottom",
      floating: false,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { fontWeight: 100, fontSize: "11px" },
      },
      tickAmount: 5,
      // tooltip: {
      //   // enabled: false,
      //   formatter: function (val, opts) {
      //     return val + "...";
      //   },
      //   style: {
      //     fontSize: "10px",
      //   },
      // },
    },
    yaxis: {
      floating: true,
      axisBorder: { show: false },
      axisTicks: { show: false },
      opposite: true,
      decimalsInFloat: 2,
      tickAmount: 5,
      labels: { offsetX: 40, style: { fontWeight: 100, fontSize: "11px" } },
    },

    tooltip: {
      theme: "dark", // Set tooltip theme
      marker: { show: false },
      x: { format: "dd MMM yyyy" },
    },

    fill: {
      colors: ["#01C38D"],
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    stroke: {
      colors: ["rgba(1, 195, 141, 1)"],
      curve: "smooth",
      lineCap: "round",
      width: 1,
    },

    grid: {
      show: true,
      borderColor: "rgba(255,255,255,0.1)",
      position: "back",
      padding: {
        left: -5,
        right: -5,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 600,
    //     options: {
    //       chart: {
    //         width: 400,
    //       },
    //     },
    //   },
    // ],
  };

  if (!historicalPriceData) return;

  return (
    <ChartWrapper>
      <div
        className="flex gap-2"
        style={{
          width: "100%",
          // height: "4.4rem",
          padding: "1rem 1rem 0.6rem 0.6rem",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "10px 10px 0 0",
        }}>
        <Image
          src={"icons/usd-to-borg.svg"}
          alt={"usd-to-borg"}
          width={40}
          height={40}
          style={{ width: "4rem", height: "auto" }}
        />
        <div className="font-light ">
          <p>USD {priceInformation?.price.toFixed(3)}</p>
          <p
            className="text-primary text-sm"
            style={{
              color:
                priceInformation?.change24h && priceInformation?.change24h > 0
                  ? "#01c38d"
                  : "#eb4f4b",
            }}>
            {priceInformation?.change24h}%{" "}
            <span className="text-primary">24 Hours</span>
          </p>
        </div>
      </div>
      <Separator />
      <ApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="area"
        height={140}
        width={520}
      />
      <div
        className="grid w-full max-w-5xl grid-cols-4 text-center font-light"
        style={{ width: "100%" }}>
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
      {/* <div
        className="grid w-full max-w-5xl grid-cols-4 text-center font-light"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", width: "100%" }}>
        <StyledButton
          isActive={selectedPeriod === "day"}
          onClick={() => handlePeriodSelection("day")}
          style={{ borderRadius: "0 0 0 10px" }}>
          1D
        </StyledButton>
        <StyledButton
          isActive={selectedPeriod === "month"}
          onClick={() => handlePeriodSelection("month")}>
          1M
        </StyledButton>
        <StyledButton
          isActive={selectedPeriod === "year"}
          onClick={() => handlePeriodSelection("year")}>
          1Y
        </StyledButton>
        <StyledButton
          isActive={selectedPeriod === "all"}
          onClick={() => handlePeriodSelection("all")}
          style={{ borderRadius: "0 0 10px 0" }}>
          ALL
        </StyledButton>
      </div> */}
    </ChartWrapper>
  );
};

export default HistoricalPriceChart;

const ChartWrapper = styled.div`
  width: 520px;
  background-color: rgba(25, 30, 41, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Separator = styled.div`
  background-color: #fff;
  height: 1px;
  width: 100%;
  opacity: 0.3;
`;
