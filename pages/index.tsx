import BorgBreakdown from "@/components/BorgBreakdown";
import BorgMetrics from "@/components/BorgMetrics";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import {
  BorgStats,
  HistoricalPricePeriod,
  PieChartData,
  Price,
} from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";
import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  try {
    const BASE_API_URL =
      "https://borg-api-techchallenge.swissborg-stage.com/api/";
    const [resBorgStats, resHistoricalData, resPriceInformation] =
      await Promise.all([
        fetch(BASE_API_URL + "borg-stats"),
        fetch(BASE_API_URL + "historical-price/day"),
        fetch(BASE_API_URL + "price"),
      ]);

    const borgStats: BorgStats = await resBorgStats.json();
    const priceInformation: Record<string, Price> =
      await resPriceInformation.json();
    const historicalData: HistoricalPricePeriod =
      await resHistoricalData.json();

    const dataForPieChart: PieChartData[] = borgStats
      ? STATS_TO_DISPLAY.map((stat) => ({
          name: formatPieChartLabel(stat.chartLabel, stat.color),
          y: borgStats[stat.attrName + "Tokens"],
          color: stat.color,
        }))
      : [];

    const formattedChartData: number[][] =
      historicalData
        ?.filter((_, index) => index % 10 === 0)
        .map((item) => [new Date(item.timestamp).getTime(), item.price]) ?? [];

    return {
      props: {
        borgStats,
        dataForPieChart,
        formattedChartData,
        priceInformation,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        error: "Error fetching data",
      },
    };
  }
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <BorgMetrics
          chartData={props.formattedChartData}
          priceInformation={props.priceInformation}
        />
      </div>
      <h2 className="text-4xl font-bold text-center p-6">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BorgBreakdown
        borgStats={props.borgStats}
        pieChartData={props.dataForPieChart}
      />
    </div>
  );
}
