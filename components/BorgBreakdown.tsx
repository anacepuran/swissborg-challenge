import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats, PieChartData } from "@/utils/types";
import { displayPercentage, formatNumberWithCommas } from "@/utils/utils";
import Image from "next/image";
import { SupplyChart } from "./SupplyChart";

interface BreakdownProps {
  borgStats: BorgStats | undefined;
  pieChartData: PieChartData[] | undefined;
}
export default function BorgBreakdown({
  borgStats,
  pieChartData,
}: BreakdownProps) {
  const BorgStatRow = (row: any) => {
    if (!borgStats) return;
    return (
      <>
        <div className="flex gap-2">
          <Image
            src={"icons/" + row.icon}
            alt={`${row.title}`}
            width={12}
            height={12}
            style={{ width: "2.6rem", height: "auto" }}
            priority
            unoptimized
          />
          <div
            className={
              `flex flex-col-reverse w-full justify-between` +
              ` lg:flex-row lg:gap-2 lg:items-center`
            }>
            <p className="text-lg lg:text-xl text-left">{row.title}</p>
            <div className="flex flex-col text-primary text-left lg:text-right">
              <p className="text-xl font-bold">
                {formatNumberWithCommas(borgStats[row.attrName + "Tokens"])}
              </p>
              {row.showPercentage && (
                <div>
                  (
                  <b>
                    {displayPercentage(borgStats[row.attrName + "Percentage"])}
                  </b>
                  % of Circulating supply)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="separator m-1" />
      </>
    );
  };

  if (!borgStats) return;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:pb-10 md:pb-12 max-w-3xl">
      <div className="flex flex-col justify-center">
        {borgStats &&
          STATS_TO_DISPLAY.map((stat) => {
            return <div key={stat.attrName}>{BorgStatRow(stat)}</div>;
          })}
      </div>
      <SupplyChart chartData={pieChartData} />
    </div>
  );
}
