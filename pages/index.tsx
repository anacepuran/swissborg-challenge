import { fetchData } from "@/api/fetch";
import BorgBreakdown from "@/components/BorgBreakdown";
import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, PieChartData } from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";
import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  // const [borgStats, historicalData, priceInformation]: [
  //   BorgStats | undefined,
  //   HistoricalPricePeriod | undefined,
  //   Record<string, Price> | undefined
  // ] = await Promise.all([
  //   fetchData<BorgStats>("borg-stats"),
  //   fetchData<HistoricalPricePeriod>("historical-price/day"),
  //   fetchData<Record<string, Price>>("price"),
  // ]);
  const borgStats: BorgStats = fetchData<BorgStats>("borg-stats");
  const dataForPieChart: PieChartData[] = borgStats
    ? STATS_TO_DISPLAY.map(
        (stat) =>
          ({
            name: formatPieChartLabel(stat.chartLabel, stat.color),
            y: borgStats[stat.attrName + "Tokens"],
            color: stat.color,
          } as PieChartData)
      )
    : [];

  // const formattedChartData: number[][] =
  //   historicalData?.map((item) => [
  //     new Date(item.timestamp).getTime(),
  //     item.price,
  //   ]) ?? [];
  // ?.filter((_, index) => index % 10 === 0) // reduce

  return {
    props: { borgStats, dataForPieChart },
  };
  return {
    props: { borgStats, dataForPieChart, formattedChartData, priceInformation },
  };
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
        {/* <BorgMetrics
          chartData={props.formattedChartData}
          priceInfo={props.priceInformation}
        /> */}
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
