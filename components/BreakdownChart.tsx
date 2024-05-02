import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats } from "@/utils/types";
import { formatNumberWithCommas } from "@/utils/utils";
import Image from "next/image";
import { useFetchData } from "../api/fetch";
import { SupplyChart } from "./SupplyChart";

export default function Breakdown() {
  const { data: borgStats } = useFetchData<BorgStats>("borg-stats");

  const BorgStatRow = (row: any) => {
    if (!borgStats) return;
    const tokens = formatNumberWithCommas(borgStats[row.attrName + "Tokens"]);
    const percentage = formatNumberWithCommas(
      borgStats[row.attrName + "Percentage"]
    );
    return (
      <>
        <div className="flex gap-2">
          <Image
            src={"icons/" + row.icon}
            alt={`${row.title} - Icon`}
            width={32}
            height={32}
            style={{ width: "2.6rem", height: "auto" }}
            priority
          />
          <div
            className={
              `flex flex-col-reverse w-full justify-between` +
              ` lg:flex-row lg:gap-2 lg:items-center`
            }>
            <p className="text-lg lg:text-xl text-left">{row.title}</p>
            <div className="flex flex-col text-primary text-left lg:text-right">
              <p className="text-xl font-bold">{tokens}</p>
              {row.showPercentage && (
                <div>
                  (<b>{percentage}</b>% of Circulating supply)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="separator mt-2 mb-2" />
      </>
    );
  };

  if (!borgStats) return;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 pb-20 p-8">
      <div className="flex flex-col justify-center">
        {borgStats &&
          STATS_TO_DISPLAY.map((stat) => {
            return <div key={stat.attrName}>{BorgStatRow(stat)}</div>;
          })}
      </div>
      <div className="pt-4">
        <SupplyChart stats={borgStats} />
      </div>
    </div>
  );
}
