import BreakdownChart from "@/components/BreakdownChart";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, PieChartData } from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";

// const BreakdownChart = dynamic(() => import("../components/BreakdownChart"), {
//   ssr: false,
// });
// const HistoricalPriceChart = dynamic(
//   () => import("../components/HistoricalPriceChart"),
//   { ssr: false }
// );

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
  return { props: { borgStats, dataForPieChart } };
};
// satisfies GetServerSideProps<{ props: Props }>
export default function Page({
  borgStats,
  dataForPieChart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        {/* <HistoricalPriceChart /> */}
      </div>
      <h2 className="text-4xl font-bold text-center p-6">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BreakdownChart borgStats={borgStats} dataForPieChart={dataForPieChart} />
    </div>
  );
}
