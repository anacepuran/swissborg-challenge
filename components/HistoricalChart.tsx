import { HistoricalPeriod, HistoricalPricePeriod } from "@/utils/types";
import Highcharts from "highcharts";
import AreaChart from "highcharts-react-official";
import { useEffect, useState } from "react";

interface HistoricalChartProps {
  // chartData: HistoricalPricePeriod | undefined;
  selectedPeriod: HistoricalPeriod;
}

export function HistoricalChart({
  // chartData,
  selectedPeriod,
}: HistoricalChartProps) {
  const [historicalData, setHistoricalData] = useState<{
    [key: string]: number[][];
  }>({});

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

  // useEffect(() => {
  //   if (chartData) {
  //     const formattedChartData: number[][] =
  //       chartData
  //         ?.filter((_, index) => index % 10 === 0)
  //         .map((item) => [new Date(item.timestamp).getTime(), item.price]) ??
  //       [];
  //     setHistoricalData({ day: formattedChartData });
  //   }
  // }, [chartData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!historicalData[selectedPeriod]) {
          const response = await fetchHistoricalData(selectedPeriod);
          setHistoricalData((prevData) => ({
            ...prevData,
            [selectedPeriod]: response,
          }));
        }
      } catch (e) {
        console.error("Error fetching historical data:", e);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod]);

  if (!historicalData[selectedPeriod]) return <div className="loader-chart" />;

  const options = {
    title: "",
    chart: {
      type: "area",
      height: 160,
      width: 500,
      animation: false,
      backgroundColor: "rgba(25, 30, 41, 0.9)",
      style: {
        fontFamily: "TT Commons, sans-serif",
        fontWeight: "normal",
        fontSize: "14px",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      type: "datetime",
      dateTimeLabelFormats: {
        hour: "%H:%M",
        minute: "%H:%M",
        day: "%H:00",
        // day: "%d %b",
        month: "%b %y",
        year: "%b %y",
      },
      crosshair: {
        dashStyle: "Dash",
        width: 0.5,
      },
      labels: {
        reserveSpace: false,
        y: 5,
        overflow: "justify",
        style: {
          color: "#FFF",
        },
      },
      tickWidth: 0,
      minTickInterval: 4 * 3600 * 1000,
    },
    yAxis: {
      minPadding: 0,
      maxPadding: 0,
      minMargin: 0,
      maxMargin: 0,
      title: "",
      gridLineWidth: 0.5,
      opposite: true,
      labels: {
        reserveSpace: false,
        overflow: "justify",
        x: -10,
        style: {
          color: "#FFF",
        },
      },
      tickWidth: 0,
    },
    legend: { enabled: false },
    plotOptions: {
      area: {
        // animation: false,
        color: "#01C38D",
        lineWidth: 1,
        fillColor: {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, "rgba(255, 255, 255, 0)"],
            [1, "rgba(1, 195, 141, .5)"],
          ],
        },
      },
    },
    series: [
      {
        type: "area",
        name: "USD to BORG",
        data: historicalData[selectedPeriod],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            chart: { width: 320 },
          },
        },
        {
          condition: {
            minWidth: 601,
          },
          chartOptions: {
            chart: { width: 500 },
          },
        },
      ],
    },
  };
  return <AreaChart highcharts={Highcharts} options={options} />;
}
