"use client";
import styled from "styled-components";
import HistoricalPriceChart from "./HistoricalPriceChart";

export default function Metrics() {
  return (
    <>
      <ContentWrapper className="flex flex-col gap-8 items-center p-12">
        <h1 className="text-4xl lg:text-6xl">BORG Token Metrics</h1>
        <p className="font-light">
          Deep-dive into the statistics of BORG and the mechanics of the full
          SwissBorg Ecosystem.
        </p>
        <HistoricalPriceChart />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  background-image: linear-gradient(to bottom right, #191e29, #364053);
`;
