import BorgBreakdown from "@/components/BorgBreakdown";
import BorgMetrics from "@/components/BorgMetrics";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, HistoricalPricePeriod, PieChartData } from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";

interface Props {
  borgStats: BorgStats;
  dataForPieChart: PieChartData[];
}

import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://borg-api-techchallenge.swissborg-stage.com/api/borg-stats"
  );
  const borgStats: BorgStats = await res.json();
  const dataForPieChart: PieChartData[] = STATS_TO_DISPLAY.map(
    (stat) =>
      ({
        name: formatPieChartLabel(stat.chartLabel, stat.color),
        y: borgStats[stat.attrName + "Tokens"],
        color: stat.color,
      } as PieChartData)
  );
  const resHistorical = await fetch(
    "https://borg-api-techchallenge.swissborg-stage.com/api/historical-price/day"
  );
  const historicalDataPreComputed: HistoricalPricePeriod =
    await resHistorical.json();
  const formattedChartData: any = historicalDataPreComputed
    ?.filter((_, index) => index % 10 === 0) // reduce
    .map((item) => [new Date(item.timestamp).getTime(), item.price]);

  return { props: { borgStats, dataForPieChart, formattedChartData } };
};

export default function Page({
  borgStats,
  dataForPieChart,
  formattedChartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <BorgMetrics chartData={formattedChartData} />
      </div>
      <h2 className="text-4xl font-bold text-center p-6">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BorgBreakdown borgStats={borgStats} pieChartData={dataForPieChart} />
    </div>
  );
}
