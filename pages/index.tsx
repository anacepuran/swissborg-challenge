import Breakdown from "./components/BreakdownChart";
import HistoricalPriceChart from "./components/HistoricalPriceChart";

export default function Page() {
  return (
    <main style={{ fontFamily: "TT Commons, sans-serif" }}>
      <div className="flex flex-col gap-8 min-h-screen items-center w-full bg-white h-full">
        <div
          className="w-full flex flex-col gap-8 p-12 items-center text-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #191e29, #364053)",
          }}>
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
          <Breakdown />
        </div>
      </div>
    </main>
  );
}
