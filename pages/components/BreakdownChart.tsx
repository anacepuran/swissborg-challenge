import { STATS_TO_DISPLAY } from "@/utils/configuration";
import { BorgStats } from "@/utils/types";
import { formatNumberWithCommas } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBorgStats } from "../api/getters";

export default function Breakdown() {
  const [borgStats, setBorgStats] = useState<BorgStats | null>(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await getBorgStats();
      setBorgStats(res);
    };
    fetchDataAsync();
  }, []);

  const BorgStatRow = (row: any) => {
    if (!borgStats) return;
    const numberOfTokens = formatNumberWithCommas(
      borgStats[row.attrName + "Tokens"]
    );
    const percentageOfTokens = formatNumberWithCommas(
      borgStats[row.attrName + "Percentage"]
    );
    return (
      <>
        <div className="flex gap-2" key={row.attrName}>
          <Image
            src={"icons/" + row.icon}
            alt={`${row.title} - Icon`}
            width={40}
            height={40}
          />
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-3 w-full justify-between lg:items-center flex-col-reverse">
            <p className="text-lg lg:text-xl font-light text-left">
              {row.title}
            </p>
            <div className="flex flex-col text-primary text-left lg:text-right">
              <p className="text-xl font-bold">{numberOfTokens}</p>
              {row.showPercentage && (
                <div className="text-md font-light">
                  (<span className="font-bold">{percentageOfTokens}</span>% of
                  Circulating supply)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="separator" style={{ margin: "8px 0 8px 0" }} />
      </>
    );
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 pb-20 items-center">
      <div className="max-w-sm lg:max-w-md flex flex-col justify-center">
        {borgStats &&
          STATS_TO_DISPLAY.map((stat) => {
            return <>{BorgStatRow(stat)}</>;
          })}
      </div>
      <div>CHART</div>
    </div>
    //   <div className="p-12">{/* <SupplyChart stats={borgStats} /> */}</div>
  );
}
