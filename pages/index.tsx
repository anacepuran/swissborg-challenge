import BreakdownChart from "@/components/BreakdownChart";
import HistoricalPriceChart from "@/components/HistoricalPriceChart";
import { BorgStats } from "@/utils/types";

// const BreakdownChart = dynamic(() => import("../components/BreakdownChart"), {
//   ssr: false,
// });
// const HistoricalPriceChart = dynamic(
//   () => import("../components/HistoricalPriceChart"),
//   { ssr: false }
// );

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
  const res = await fetch(
    "https://borg-api-techchallenge.swissborg-stage.com/api/borg-stats"
  );
  const props: BorgStats = await res.json();
  return { props: { props } };
}) satisfies GetServerSideProps<{ props: BorgStats }>;

export default function Page({
  props,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <HistoricalPriceChart />
      </div>
      <h2 className="text-4xl font-bold text-center p-6">
        Breakdown of BORG&apos;s circulating supply
      </h2>
      <BreakdownChart borgStats={props} />
    </div>
  );
}
