import AboutBorg from "@/components/AboutBorg";
import BorgBreakdown from "@/components/BorgBreakdown";
import BorgMetrics from "@/components/BorgMetrics";
import { BASE_API_URL, STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, PieChartData, Price } from "@/utils/types";
import { formatPieChartLabel } from "@/utils/utils";
import type { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  try {
    const [resStats, resPrice] = await Promise.all([
      fetch(BASE_API_URL + "borg-stats"),
      fetch(BASE_API_URL + "price"),
    ]);

    const borgStats: BorgStats = await resStats.json();
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

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props)
    return (
      <div
        style={{ height: "100vh" }}
        className="w-full flex items-center justify-center">
        <div className="loader-chart" />;
      </div>
    );
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold">
          <span className="text-5xl md:text-6xl lg:text-6xl">BORG</span>
          Token Metrics
        </h1>
        <p>
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <BorgMetrics priceInformation={props.priceInformation} />
      </div>
      <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-center p-8">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BorgBreakdown
        borgStats={props.borgStats}
        pieChartData={props.dataForPieChart}
      />
      <AboutBorg />
    </div>
  );
}
