"use client";
import { STATS_TO_DISPLAY } from "@/config";
import { BorgStats } from "@/types";
import { displayPercentage, formatNumberWithCommas } from "@/utils";
import { getBorgStats } from "@/utils/fetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SupplyChart from "./SupplyChart";

export default function Breakdown() {
  const [borgStats, setBorgStats] = useState<BorgStats | null>(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const res = await getBorgStats();
      setBorgStats(res);
    };
    fetchDataAsync();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center bg-white text-black w-full h-full">
      <h2 className="text-4xl">Breakdown of BORG&apos;s circulating supply</h2>
      <div className="grid lg:grid-cols-2 lg:w-full lg:max-w-4xl">
        <div>
          {borgStats &&
            STATS_TO_DISPLAY.map((stat) => {
              return (
                <>
                  <div
                    className="flex items-center justify-between"
                    key={stat.attrName}>
                    <div
                      className="flex gap-2 items-center"
                      style={{ width: "", height: "72px" }}>
                      <Image
                        color={"primary"}
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                        src={"icons/" + stat.icon}
                        alt={`${stat.title} - Icon`}
                        width={40}
                        height={40}
                        priority
                      />
                      <p className="text-xl font-light">{stat.title}</p>
                    </div>
                    <div className="flex flex-col text-primary text-right">
                      <p className="text-xl">
                        {formatNumberWithCommas(
                          borgStats[stat.attrName + "Tokens"]
                        )}
                      </p>
                      {stat.showPercentage && (
                        <div className="font-light">
                          (
                          <span style={{ fontWeight: "normal" }}>
                            {displayPercentage(
                              borgStats[stat.attrName + "Percentage"]
                            )}
                          </span>
                          % of Circulating supply)
                        </div>
                      )}
                    </div>
                  </div>
                  <Separator />
                </>
              );
            })}
        </div>
        <div className="p-12">
          <SupplyChart stats={borgStats} />
        </div>
      </div>
    </div>
  );
}

const Separator = styled.div`
  background-color: #8f96a1;
  height: 1px;
  width: 100%;
  opacity: 0.3;
`;
