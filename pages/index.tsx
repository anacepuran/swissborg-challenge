import BorgBreakdown from "@/components/BorgBreakdown";
import BorgMetrics from "@/components/BorgMetrics";
import { BASE_API_URL, STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, PieChartData, Price } from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";
import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  try {
    const [resStats, resHistorical, resPrice] = await Promise.all([
      fetch(BASE_API_URL + "borg-stats"),
      fetch(BASE_API_URL + "historical-price/day"),
      fetch(BASE_API_URL + "price"),
    ]);

    const borgStats: BorgStats = await resStats.json();
    // const historicalData: HistoricalPricePeriod = await resHistorical.json();
    const priceInformation: Record<string, Price> = await resPrice.json();

    const dataForPieChart: PieChartData[] = borgStats
      ? STATS_TO_DISPLAY.map((stat) => ({
          name: formatPieChartLabel(stat.chartLabel, stat.color),
          y: borgStats[stat.attrName + "Tokens"],
          color: stat.color,
        }))
      : [];

    return {
      props: {
        borgStats,
        dataForPieChart,
        // historicalData,
        priceInformation,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        error: "Error fetching data.",
      },
    };
  }
};

export default function Page({
  borgStats,
  dataForPieChart,
  // historicalData,
  priceInformation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <BorgMetrics
          // chartData={historicalData}
          priceInformation={priceInformation}
        />
      </div>
      <h2 className="text-4xl font-bold text-center p-6">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BorgBreakdown borgStats={borgStats} pieChartData={dataForPieChart} />
    </div>
  );
}
