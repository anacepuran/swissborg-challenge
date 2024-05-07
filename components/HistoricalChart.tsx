import { getAreaChartConfig } from "@/utils/areaChartConfiguration";
import { fetchHistoricalData } from "@/utils/fetch";
import { HistoricalPeriod } from "@/utils/types";
import * as Highcharts from "highcharts/highcharts";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const AreaChart = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface HistoricalChartProps {
  selectedPeriod: HistoricalPeriod;
}

export function HistoricalChart({ selectedPeriod }: HistoricalChartProps) {
  const [historicalData, setHistoricalData] = useState<{
    [key: string]: number[][];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!historicalData[selectedPeriod] || selectedPeriod === "all") {
          const response = await fetchHistoricalData(selectedPeriod);
          setHistoricalData((old) => ({
            ...old,
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

  const chartData = useMemo(() => {
    return historicalData[selectedPeriod];
  }, [historicalData, selectedPeriod]);

  const chartOptions = useMemo(() => {
    const onlyValues =
      historicalData[selectedPeriod]?.map((point) => point[1]) ?? [];
    const min = Math.min(...onlyValues) ?? 0;
    const max = Math.max(...onlyValues) ?? 0;
    return {
      series: [
        {
          type: "area",
          name: "USD to BORG",
          data: chartData,
        },
      ],
      ...getAreaChartConfig(min, max),
    };
  }, [chartData, historicalData, selectedPeriod]);

  if (!historicalData[selectedPeriod])
    return (
      <div className="area-chart-wrapper">
        <div className="loader-chart" />
      </div>
    );

  return (
    <div className="area-chart-wrapper">
      <AreaChart
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </div>
  );
}
