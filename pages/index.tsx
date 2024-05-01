import dynamic from "next/dynamic";
const BreakdownChart = dynamic(() => import("../components/BreakdownChart"), {
  ssr: false,
});
const HistoricalPriceChart = dynamic(
  () => import("../components/HistoricalPriceChart"),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center w-full bg-white h-full">
      <div className="banner">
        <h1 className="text-4xl lg:text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <HistoricalPriceChart />
      </div>
      <div className="text-black">
        <h2 className="text-4xl font-bold text-center">
          Breakdown of BORG&apos;s circulating supply
        </h2>
        <BreakdownChart />
      </div>
    </div>
  );
}
