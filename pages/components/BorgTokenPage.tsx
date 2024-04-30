import HistoricalPriceChart from "./HistoricalPriceChart";

export default function BorgTokenPage() {
  return (
    <main className="flex flex-col gap-8 min-h-screen items-center bg-white w-full">
      <div
        className="w-full flex flex-col gap-8 p-12 items-center text-center"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #191e29, #364053)",
        }}>
        <h1 className="text-6xl font-bold">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <HistoricalPriceChart />
      </div>
    </main>
  );
}
